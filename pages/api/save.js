import { GoogleSpreadsheet } from 'google-spreadsheet'
import moment from 'moment'

const doc = new GoogleSpreadsheet(process.env.SHEET_DOC_ID)

const fromBase64 = value => {
    const buff = new Buffer.from(value, 'base64');
    return buff.toString('ascii');
}

const genCupom  = () => {
    const code = parseInt(moment().format('YYMMDDHHmmssSSS')).toString(16).toUpperCase()
    return code.substr(0,4) + '-' + code.substr(4,4) + '-' + code.substr(8, 4)
}

export default async(req, res) => {

    //await doc.useServiceAccountAuth(credentials)
    await doc.useServiceAccountAuth({
        client_email: process.env.SHEET_CLIENT_EMAIL,
        private_key: (fromBase64(process.env.SHEET_PRIVATE_KEY))
    })
    await doc.loadInfo()
    const sheet = doc.sheetsByIndex[1]
    const data = JSON.parse(req.body)

    const sheetConfig = doc.sheetsByIndex[2]
    await sheetConfig.loadCells('A2:B2')
    
    const mostrarPromocaocell = sheetConfig.getCell(1, 0)
    const textoCell = sheetConfig.getCell(1, 1)

    let Cupom = ''
    let Promo = ''
    if(mostrarPromocaocell.value === 'VERDADEIRO') {
        Cupom = genCupom()
        Promo = textoCell.value
    }

    //Nome	Email	Whatsapp	Cupom	Promo
    await sheet.addRow({
        Nome: data.Nome,
        Email: data.Email,
        Whatsapp: data.Whatsapp,
        Nota: parseInt(data.Nota),
        'Data Preenhimento': moment().format('DD/MM/YYYY HH:mm:ss'),
        Cupom,
        Promo
    })
    res.end(JSON.stringify({
        showCoupon: Cupom !== '',
        Cupom, 
        Promo
    }))
}