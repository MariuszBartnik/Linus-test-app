class CrmModule{
    apiKey='';
    connection;
    tempData;

    constructor(apiKey){
        this.apiKey = apiKey;
        this.tempData = [];
        this.connection = {
            investors: {
                get() {
                    return new Promise((resolve) => {
                        setTimeout(() => {
                            resolve({success: true, data: this.tempData});
                        }, 1000)
                    })
                },
                create(investment){
                    return new Promise((resolve) => {
                        setTimeout(() => {
                            this.tempData ? this.tempData = [...this.tempData, investment] : this.tempData = [investment];
                            resolve({success: true, data: this.tempData})
                        }, 1000)
                    })
                }
            }
        }
    }

    get connection() {
        return this.connection;
    }
}

module.exports = CrmModule;