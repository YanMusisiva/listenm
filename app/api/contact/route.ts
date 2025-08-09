import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { name, email: rawEmail, message } = await req.json();

  // Validation des champs
  const errors: Record<string, string> = {};
  if (
    !name ||
    typeof name !== "string" ||
    name.trim().length < 2 ||
    name.length > 50
  ) {
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
  if (
    !message ||
    typeof message !== "string" ||
    message.trim().length < 10 ||
    message.length > 200
  ) {
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
      from: `"ListenMethod Contact" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      subject: `Nouveau message de contact ListenMethod`,
      text: `Vous avez reçu un nouveau message via le formulaire de contact ListenMethod :

Nom : ${name}
Email : ${email}

Message :
${message}
`,
      html: `
        <div style="font-family:sans-serif;font-size:1rem;color:#222;">
          <h2 style="color:#111;">Nouveau message de contact ListenMethod</h2>
          <p><b>Nom :</b> ${name}</p>
          <p><b>Email :</b> ${email}</p>
          <p><b>Message :</b><br/>${message.replace(/\n/g, "<br/>")}</p>
        </div>
      `,
    });
  } catch {
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
      from: `"ListenMethod" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Merci pour votre message – Bienvenue sur ListenMethod 🚀",
      text: `Bonjour ${name},

Merci de nous avoir contactés !

Chez ListenMethod, nous croyons qu'apprendre l'anglais peut être simple, agréable et efficace, même si vous partez de zéro.

En seulement 30 jours, vous allez :
- Écouter 30 minutes d'anglais par jour pour habituer votre oreille aux sons et aux phrases utiles.
- Parler avec nos formateurs qui vous laisseront vous exprimer librement, sans vous interrompre toutes les deux secondes.
- Oublier la grammaire par cœur et la pression scolaire : ici, c'est juste écoute, répétition et parole.

Résultat : des progrès concrets que vous ressentirez chaque jour, et la confiance pour parler anglais pour de vrai.

Nous avons bien reçu votre message :
"${message}"

Nous revenons vers vous très vite.

Répondez directement à cet e-mail si vous souhaitez démarrer votre programme dès aujourd'hui.

À bientôt sur ListenMethod,
L'équipe ListenMethod
`,

      html: `
      <div style="font-family:sans-serif;font-size:1rem;color:#222;max-width:600px;margin:auto;">
        <h2 style="color:#111;">Merci pour votre message, ${name} 🚀</h2>
        <p>Chez <b>ListenMethod</b>, nous croyons qu'apprendre l'anglais peut être simple, agréable et efficace, même si vous débutez.</p>

        <div style="background:#f7fafc;padding:16px 20px;border-radius:8px;margin:24px 0;">
          <b>En seulement 30 jours, vous allez :</b>
          <ul style="margin:12px 0;padding-left:20px;">
            <li>🎧 Écouter 30 minutes d'anglais par jour pour habituer votre oreille aux sons et aux phrases utiles.</li>
            <li>🗣️ Parler avec nos formateurs qui vous laisseront vous exprimer librement, sans vous couper toutes les deux secondes.</li>
            <li>💡 Oublier la grammaire par cœur et la pression scolaire : juste écoute, répétition et parole.</li>
          </ul>
        </div>

        <p><b>Résultat :</b> des progrès concrets chaque jour, et la confiance pour parler anglais pour de vrai.</p>

        <p>Votre message a bien été reçu :</p>
        <div style="background:#f1f5f9;padding:12px 16px;border-radius:6px;margin:16px 0;color:#444;">
          "${message.replace(/\n/g, "<br/>")}"
        </div>

        <p style="margin-top:24px;">
          Répondez directement à cet e-mail pour démarrer votre programme dès aujourd'hui.<br>
          Nous reviendrons vers vous rapidement.<br>
          À bientôt sur <b>ListenMethod</b> !<br>
          L’équipe ListenMethod
        </p>
      </div>
    `,
    });
  } catch {
    // On ne bloque pas la réponse si l'email utilisateur échoue
  }
  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
