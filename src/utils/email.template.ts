export default function emailTemplate(params: { url: string; host: string }) {
  const { url, host } = params
  const escapedHost = host.replace(/\./g, '&#8203;.')

  const color = {
    background: 'linear-gradient(#D1E6E8, #EEE3FE);',
    text: '#3A3939',
    mainBackground: '#fff',
    buttonBackground: '#3A3939',
    buttonBorder: '#3A3939',
    buttonText: '#fff',
  }

  return `
  <body style="background-image: ${color.background};">
    <table width="100%" height="100%" border="0" cellspacing="20" cellpadding="0"
      style="background: ${color.mainBackground}; max-width: 600px; margin: auto; border-radius: 10px;">
      <tr>
      <td valign="middle" style="padding: 3em 0 2em 0;">
        <img src="cid:logo" alt="" style="max-width: 150px; height: auto; margin: auto; display: block;">
      </td>
    </tr><!-- end tr -->
      <tr>
        <td align="center"
          style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
          Sign in to <strong>${escapedHost}</strong>
        </td>
      </tr>
      <tr>
        <td  align="center" style="padding: 2em 0 4em 0;">
          <table border="0" cellspacing="0" cellpadding="0">
          	<tr>
          		<td align="center">
          				<h2>請驗證您的信件，並點擊登入回主頁面</h2>
          				<h3>如果郵件並不是由您登入發送，請忽略此郵件</h3>
          		</td>
          	</tr>
          </table>
        </td>
       <!-- end tr -->
      <tr>
        <td align="center" style="padding: 20px 0;">
          <table border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td align="center" style="border-radius: 5px;" bgcolor="${color.buttonBackground}"><a href="${url}"
                  target="_blank"
                  style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${color.buttonText}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${color.buttonBorder}; display: inline-block; font-weight: bold;">點擊我，回首頁</a></td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td align="center"
          style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">

        </td>
      </tr>
    </table>
  </body>
  `
}
