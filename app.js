const scriptURL = 'https://script.google.com/macros/s/AKfycbxIciJPJoUaFeCyU2bvM71Do5FLurhZGzIsdT4PqoA0lBdtryUtRypd4FzTIY9_g0Eq-A/exec'
const form = document.forms['google sheet']

form.addEventListener('submit', e => {
    var crypt = {
        secret: "THESECRET",
        encrypt: function(password) {
            var encrypted = Crypto.AES.encrypt(password, crypt.secret)
            encrypted = encrypted.toString()
            return encrypted
        },
        decrypt: function(encrypted) {
            var decrypted = Crypto.AES.decrypt(encrypted, crypt.secret)
            decrypted = decrypted.toString(CryptoJS.enc.Utf8)
            return encrypted
        }
    }
    var encrypted = crypt.encrypt(document.getElementById('password').nodeValue)
    console.log(encrypted)

    document.getElementById(password).value = encrypted

    var decrypted = crypt.decrypt(encrypted)
    console.log(decrypted)

    e.preventDefault()
    fetch(scriptURL, {method: 'POST', body: new FormData(form)}).then(response =>
        document.getElementById('form-alerts').innerHTML = 'Data sent sucessfully').catch(error =>
            document.getElementById('form-alerts').innerHTML = 'Data has not sent')

}) 