import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { name, email: rawEmail, message } = await req.json();

  // Validation des champs
  const errors: Record<string, string> = {};
  if (!name || typeof name !== "string" || name.trim().length < 2) {
    errors.name = "Le nom est requis (au moins 2 caractères).";
  }
  const email = (rawEmail || "").trim();
  if (
    !email ||
    typeof email !== "string" ||
    !/^[\w-.]+@[\w-]+\.[a-z]{2,}$/i.test(email)
  ) {
    errors.email = "Email invalide.";
  }
  if (!message || typeof message !== "string" || message.trim().length < 10) {
    errors.message = "Le message doit contenir au moins 10 caractères.";
  }
  if (Object.keys(errors).length > 0) {
    return new Response(JSON.stringify({ errors }), { status: 400 });
  }

  // Création du transporteur nodemailer
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // Email à l'administrateur du site
  try {
    await transporter.sendMail({
      from: `"AsCode Contact" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      subject: `Nouveau message de contact AsCode`,
      text: `Vous avez reçu un nouveau message via le formulaire de contact AsCode :

Nom : ${name}
Email : ${email}

Message :
${message}
`,
      html: `
        <div style="font-family:sans-serif;font-size:1rem;color:#222;">
          <h2 style="color:#111;">Nouveau message de contact AsCode</h2>
          <p><b>Nom :</b> ${name}</p>
          <p><b>Email :</b> ${email}</p>
          <p><b>Message :</b><br/>${message.replace(/\n/g, "<br/>")}</p>
        </div>
      `,
    });
  } catch (e) {
    return new Response(
      JSON.stringify({
        error: "Erreur lors de l'envoi de l'email à l'administrateur.",
      }),
      { status: 500 }
    );
  }

  // Email de confirmation à l'utilisateur
  try {
    await transporter.sendMail({
      from: `"AsCode" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Merci pour votre message – Bienvenue sur AsCode 🚀",
      text: `Bonjour ${name},

Merci de nous avoir contactés !

Chez AsCode, nous croyons qu'apprendre à coder peut devenir simple et rapide, même si vous partez de zéro. Grâce aux outils d'intelligence artificielle comme GitHub Copilot, ChatGPT ou Cursor, vous pouvez créer de vrais projets en quelques mois au lieu de plusieurs années.

Voici notre parcours étape par étape :
1️⃣ Démarrage : Comprendre les bases du code sans stress.
2️⃣ Pratique : Créer vos premiers mini-projets guidés.
3️⃣ IA au service de votre apprentissage : Utiliser Copilot et ChatGPT pour coder plus vite.
4️⃣ Niveau avancé : Construire des applications réelles et lancer vos projets.

Avec AsCode, vous apprenez en créant, pas en restant bloqué sur la théorie.

Nous avons bien reçu votre message :
"${message}"

Nous revenons vers vous très vite.

 Répondez directement à cet e-mail pour nous dire si vous souhaitez profiter de l’accompagnement gratuit, ou si vous préférez passer dès maintenant à la formation complète pour avancer plus vite. !

À très bientôt sur AsCode pour commencer cette aventure !
L'équipe AsCode
`,

      html: `
      <div style="font-family:sans-serif;font-size:1rem;color:#222;max-width:600px;margin:auto;">
        <h2 style="color:#111;">Merci pour votre message, ${name} 🚀</h2>
        <p>Chez <b>AsCode</b>, nous croyons qu'apprendre à coder peut être simple, rapide et concret, même si vous débutez.</p>
        <p>Grâce aux outils d'IA comme <b>GitHub Copilot</b>, <b>ChatGPT</b> ou <b>Cursor</b>, vous pouvez créer de vrais projets en quelques mois et progresser plus vite que jamais.</p>
        
        <div style="background:#f7fafc;padding:16px 20px;border-radius:8px;margin:24px 0;">
          <b>Voici notre parcours étape par étape :</b>
          <ul style="margin:12px 0;padding-left:20px;">
            <li><b>1️⃣ Démarrage :</b> Comprendre les bases sans stress.</li>
            <li><b>2️⃣ Pratique :</b> Créer vos premiers mini-projets.</li>
            <li><b>3️⃣ IA au service de votre apprentissage :</b> Utiliser Copilot, ChatGPT, Cursor pour coder plus vite.</li>
            <li><b>4️⃣ Niveau avancé :</b> Construire de vraies applications.</li>
          </ul>
        </div>

        <p>Votre message a bien été reçu :</p>
        <div style="background:#f1f5f9;padding:12px 16px;border-radius:6px;margin:16px 0;color:#444;">
          "${message.replace(/\n/g, "<br/>")}"
        </div>

        <p style="margin-top:24px;">
  Répondez directement à cet e-mail pour nous dire si vous souhaitez profiter de l’accompagnement gratuit, ou si vous préférez passer dès maintenant à la formation complète pour avancer plus vite.<br>
  Nous reviendrons vers vous très vite.<br>
  À très bientôt sur <b>AsCode</b> pour commencer cette aventure !<br>
  L’équipe AsCode
</p>

      </div>
    `,
    });
  } catch {
    // On ne bloque pas la réponse si l'email utilisateur échoue
  }
  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
