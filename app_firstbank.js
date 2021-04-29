var AppData = {

    Name: 'FirstMobile',

    Version: '1.9.9.1',

    // push_app_Id: 'b9a00a0ecfd3388b', //TEST
    push_app_Id: 'f928adb11d8b76b9', //LIVE


    push_language: 'en',
    push_timezone: '2',
    push_devicetype: 'phone',

    aes_Key: 'B374A26A71490437AA024E4FADD5B497FDFF1A8EA6FF12F6FB65AF2720B59CCF',

    Url_Ads: 'https://adserver.vanso.com/www/delivery/ax.php',

    Store: {
        name: 'FBStore',
        data: {
            notifications: []
        },
    },

    // Mock
    //  Url: 'http://84.200.29.246:8084/FBN-Proxy/api/',
    // Test
    // Url: 'https://mobappdev.firstbanknigeria.com/FBN-Proxy/api/',

    // Url: 'https://mobappcont.firstbanknigeria.com/FBN-Proxy/api/',

    // Live
    Url: 'https://mobapp.firstbanknigeria.com/FBN-Proxy/api/',

    // Loan_Url: 'http://84.200.29.246:8084/loan/api/',

    //Loan_Url: 'https://mobappdev.firstbanknigeria.com/New-Proxy/api/',

    // Push
    Url_Push_Registration: 'https://rtcp.vanso.com/api/devices/register_device?',
    Url_Push_Receipt: 'https://rtcp.vanso.com/api/read_receipt/opened?',
    Url_Push_Set_Location: 'https://rtcp.vanso.com/api/location/set?',

    BB_App_ID: '1375-7199943Bmi6y27M23357eMm856547r0o1k4',
    //  BB_App_ID: '5031-5a3870e23iI49n36920mo355611lla20s34',
    BB_ppgUrl: 'http://cp1375.pushapi.na.blackberry.com',
    //        BB_ppgUrl: 'http://cp5031.pushapi.eval.blackberry.com',
    package_Id: 'com.firstbank.firstmobile',

    // Countly
    Url_Countly: 'https://mobile-analytics.vanso.com/i',

    // App_Key: '3da75a80fb9cc639eb100c669d4c0364609d6596', //DEV
    App_Key: 'b42ab31d0e95047d3ecd993bf3003b5126d216ab', //LIVE


    Url_Carrier: 'http://apps.vanso.com/ip2location/ip2location_webservice.php/',
    Url_Bank_Info_Key: 'fa419b193cb109ad32214a37e53c92f95d1ed613',

    Service: {},

    SessionId: null,
    Customer_Name: null,
    Accounts_Collection: null,
    Last_Login: '',
    QREnrolled: false,
    acquiringBin: null,

};
const req = async (url, data, type) => {
    var opt = {
        headers: {
            'Cache-Control': 'no-cache',
            'client_id': 'tPYQ0YJCeN8QsYS3c/lRweuNjwi0yYtrNeDhBrE=',
            'appVersion': AppData.Version
        },
        method: type
    }
    type == "post" ? opt.data = JSON.stringify(data) : '';
    try {
        var _req = await fetch(url, opt);
        return await _req.json();
    }
    catch (e) {
        console.log | (e)
        throw e;

    }

}
AppData.Account = {
    getAccounts: class {
        constructor(url, data) {
            url ? this.url = url : this.url = AppData.Url + `account/list`;
            data ? this.data = data : this.data = {};
            this.method = 'get';
        }
        async test() {
            var _req = await req(this.url, this.data, 'get');
            return _req;
        }
    },
    getMiniStatement: class {
        constructor(url, data, accountNumber, sessionId) {
            url ? this.url = url : this.url = AppData.Url + `enc2/account/statement/` + + '?sessionID=' + encodeURIComponent(aes.Ctr.encrypt(sessionId, AppData.aes_Key, 256)) + '&accountNumber=' + encodeURIComponent(aes.Ctr.encrypt(accountNumber, AppData.aes_Key, 256));
            data ? this.data = data : this.data = {};
            this.method = 'get';
        }
        async test() {
            var _req = await req(this.url, this.data, this.method);
            return _req;
        }
    },
    refreshAccountBalance: class {
        constructor(url, data, accountNumber) {
            url ? this.url = url : this.url = AppData.Url + `enc2/acoount/balance` + AppData.Session_Id + '/' + accountNumber;
            data ? this.data = data : this.data = {};
            this.method = 'get';
        }
        async test() {
            var _req = await req(this.url, this.data, 'get');
            return _req;
        }
    }
}