class EmailModule{
    apiKey = '';
    transport = {};

    constructor(apiKey){
        this.apiKey = apiKey;
        this.transport = {
            sendMail(to, subject, text) {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve({success: true, data: {msg: `Confirmation email to ${to} has been sent successfully`}})
                    }, 1000)
                })
            }
        }
    }

    get transport() {
        return this.transport
    }
}

module.exports = EmailModule;