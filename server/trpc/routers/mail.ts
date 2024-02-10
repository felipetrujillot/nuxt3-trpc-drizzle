import nodemailer from 'nodemailer'
import sgMail from '@sendgrid/mail'

const apiKey =
  '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'
sgMail.setApiKey(apiKey)

const transporter = nodemailer.createTransport({
  service: 'SendGrid',
  auth: {
    user: 'apikey',
    pass: apiKey,
  },
})

/**
 *
 * @param to
 * @param urlToken
 */
export const sendMailPasswordForget = (to: string, urlToken: string) => {
  const html = `
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;400&display=swap');
    * {
        font-family: 'Roboto', sans-serif !important;
    }
    
    span {
        font-size: 1.3rem;
        line-height: 1.5rem;
    }
    </style>
    
    <body style="background-color: #fafafa;  margin-top: 5rem;">
        <div align="center">
            <table>
                <thead>
                    <tr>
                        <th style="background-color:#f5f5f5
                        ; border-top-left-radius: 0.5rem;border-top-right-radius: 0.5rem; width:650px">
                                 <img src="https://linebox.cl/linebox_logo.png" 
                                 alt="" style="width: 40%; padding-top: 1.5rem; padding-botom: 1.5rem;         
                        filter: contrast(0) opacity(1) brightness(100);
                        ">
                </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style='padding: 20px 10px 20px 10px; background-color: #f5f5f5; border-radius: 0.5rem;'>
                            <table align='center' border='0' cellpadding='0' cellspacing='0' id='bodyTable' style='border-collapse:collapse;height:100%;margin:0;padding:0;width:100%'>
                                <tbody>
                                    <tr>
                                        <td style='border-top:0;height:100%;vertical-align:top;width:650px'>
                                            <div align='left' style='padding: 20px;'>
                                                <div style="color:#212529">
                                                    <h1 style="text-align: center; font-size: 1.5rem;">¿Olvidaste tu contraseña?</h1>
                                                    <h2 style="font-weight: 400;">Hola,
                                                        <br> Estás a punto de cambiar tu contraseña. Para continuar con el proceso, haz click en el botón:</h2>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td style="padding: 5px;">
                                            <div style="text-align: center;">
                                                <a href="${urlToken}">
                                                    <button type="button" style="cursor:pointer;color:white; background-color: #1d4d60 ;border-color: #1d4d60; font-size: 1.5rem; padding: 1rem; padding-left: 1.5rem; padding-right: 2rem; border: none; border-radius: 2rem;">
                                                        Cambiar clave
                                                    </button>
                                                </a>
                                            </div>
                                            <br>
                                            <div style="color:#5b5e61">
                                                <h2 style="font-weight: 400; padding: 0.5rem; font-size: 1rem">
                                                    ¿No solicitaste un cambio de contraseña? Puedes ignorar este correo.</h2>
                                            </div>
                                        </td>
                                        <td></td>
                                    </tr>
                                </tfoot>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </body>
    `

  const mailOptions = {
    from: 'contacto@linebox.cl',
    to: to,
    subject: '¿Olvidaste tu contraseña?',
    html: html,
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      throw error
    } else {
      return true
    }
  })
}
