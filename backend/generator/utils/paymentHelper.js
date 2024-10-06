const axios = require('axios')

let isRequestInProgress = false

const consumerKey = ''
const consumeSecretKey = '' 
const lipaNaMpesaOnlineShortCode = ''
const lipaNaMpesaOnlinePassKey = ''
const lipaNaMpesaOnlineCallBackUrl = ''
const Party2B = ''

const getToken = async() => {
    const url = 'https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials'
    const auth = Buffer.from(`${consumerKey}:${consumeSecretKey}`).toString('base64')

    const response = await axios.get(url, {
        headers : {
            Authorization: `Basic ${auth}`
        }
    })

    const data = await response.json()

    if(!data.access_token) {
        throw new Error('Failed to access token')
    }

    return data.access_token
}

const lipaNaMpesaOnline = async(item, phoneNumber, amount, orderId) => {

    if(isRequestInProgress) {
        throw new Error('Another request is already in progress')
    }

    isRequestInProgress= true

    try {
        const accessToken = await getToken()
        const timeStamp = generateTimeStamp()

        const url = 'https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest'
        const password = Buffer.from(`${lipaNaMpesaOnlineShortCode}${lipaNaMpesaOnlinePassKey}${timeStamp}`).toString('base64')

        const payLoad = {
            BusinessShortCode: lipaNaMpesaOnlineShortCode,
            TimeStamp: timeStamp,
            Password : password,
            TransactionType: 'CustomerBuyGoodsOnline',
            Amount: amount,
            PartyA: phoneNumber,
            PartyB: Party2B,
            PhoneNumber: phoneNumber,
            CallBackUrl: lipaNaMpesaOnlineCallBackUrl,
            AccountReference: orderId,
            TransactionDesc: item
        }

        const response = await axios.post(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(payLoad)
        })

        const data = response.json()

        return data
    } finally {
        isRequestInProgress = false
    }
}

const generateTimeStamp = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = (`0${now.getMonth() + 1}`).slice(-2); 
    const day = (`0${now.getDate()}`).slice(-2);         
    const hours = (`0${now.getHours()}`).slice(-2);
    const minutes = (`0${now.getMinutes()}`).slice(-2);
    const seconds = (`0${now.getSeconds()}`).slice(-2);

    return `${year}${month}${day}${hours}${minutes}${seconds}`;
}



const CallBack = async (body) => {
    try{
        const {stkCallBack} = body.Body

        const {ResultCode, CheckoutRequestId, CallbackMetadata, ResultDesc } = stkCallBack

        let orderId = null
        let amountPaid = null
        let phoneNumber = null
        let status = ResultDesc

        //check for success of the transaction
        if(ResultCode === 0) {
            //extract necessary details from calback Metadata
            orderId = findValueInMetadata(CallbackMetadata.item, 'MpesaReceiptNumber')
            amountPaid = findValueInMetadata(CallbackMetadata.item, 'Amount')
            phoneNumber = findValueInMetadata(CallbackMetadata.item, 'PhoneNumber')
        }

        status = 'Payment Successful'

        return{
            success: ResultCode === 0,
            data : {
                CheckoutRequestId: CheckoutRequestId,
                status: status,
                ...(ResultCode === 0 && {orderId, amountPaid, phoneNumber})
            }
        }
    } catch (error){
        console.error('Error occured while Processing the callback', error)
        return {success: false, data: {CheckoutRequestId:null, status: 'Error'}}
    }
}
module.exports= {
    lipaNaMpesaOnline,
    CallBack
}
