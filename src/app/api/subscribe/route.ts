import { NextRequest, NextResponse } from 'next/server';
import mailchimp from '@mailchimp/mailchimp_marketing';

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY || '',
  server: process.env.MAILCHIMP_API_SERVER || '',
});

export async function POST(req: NextRequest) {
  const { name, surname, email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: 'Correo electrónico requerido' }, { status: 400 });
  }

  try {
    const response = await mailchimp.lists.addListMember(
      process.env.MAILCHIMP_AUDIENCE_ID || '',
      {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          FNAME: name || '',
          LNAME: surname || '',
        },
      }
    );

    return NextResponse.json({ message: 'Suscripción exitosa', response });
  } catch (error: unknown) {
  if (error instanceof Error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ error: "Error inesperado" }, { status: 500 });
}
}
