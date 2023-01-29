window.onload = async function main() {
    const promoCodes = ["PEPSI25", "10OFF", "15OFF"];
    console.log("Wealth Wise Working");
    if (window.location.href.includes("amazon")) {
        var find = "total",
            queue = [document.body],
            curr;
        while (curr = queue.pop()) {
            if (!curr.textContent.includes(find)) continue;
            for (var i = 0; i < curr.childNodes.length; ++i) {
                switch (curr.childNodes[i].nodeType) {
                    case Node.TEXT_NODE: // 3
                        if (curr.childNodes[i].textContent.includes(find)) {
                            console.log("This page contains " + find);

                            var totalText = document.getElementsByClassName('grand-total-price')[0];
                            if (totalText) {
                                var total = parseFloat(totalText.textContent.trim().substring(1));
                            } else {
                                var total = 0;
                            }

                            chrome.storage.sync.set({ "grandTotal": total }, function () {
                                console.log("Total saved");
                            });

                            promoCodes.forEach((code) => {
                                console.log(code);
                            });

                            let promoCodeInput = document.getElementById('spc-gcpromoinput');
                            promoCodeInput.value = "XXX";
                            let promoCodeButton = document.getElementById('gcApplyButtonId');
                            promoCodeButton.click();

                            // HTML of the popup that will show when the content is found
                            var popupHTML = "<div id='closeme' style='position:fixed;width: 300px;height: 400px;top:0;right:0;z-index:999;color: black;margin:8px;background-color: #fbfbfb;border:2px solid gray;border-radius:5px;background-image: url(&quot;https://imgur.com/DdPHEbA.png&quot; );background-position: center;background-repeat: no-repeat; background-size: cover;'><linkhref='https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css' rel='stylesheet'  integrity='sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC'  crossorigin='anonymous'>  <style>  .btn,  .btn-primary {  color: #fff;  background-color: #28a745;   border-color: #1c712f;  margin-left: 10px;    margin-top: 10px;    }   .btn:hover,  .btn-primary:hover   color: #fff; background-color: #1c712f;  border-color: #1c712f;  }   </style> <div id='page1'><img src='https://imgur.com/BRxoiCY.png' height='50' width='50' style='margin-left:6px;'/> <img src='https://media2.giphy.com/media/xvsYBQ92YPaUbuXWQH/giphy.gif?cid=790b76115c90f505f1f173c90a1e47221dade6caa8ee79b2&rid=giphy.gif&ct=g' height='190' width='240'        style='margin-left:30px;'/>   <h2 style='font-family:Arial, Helvetica, sans-serif; text-align: center;   font-size: 1.1rem; font-weight: bold;'>Wealth Wise has coupons for this  site!</h2>   <button class='btn btn-primary' onClick='(function(){document.getElementById(&quot;page2&quot;).visibility = &quot;visible&quot;;document.getElementById(&quot;page1&quot;).visibility = &quot;hidden&quot;;document.getElementById(&quot;page1&quot;).style.display = &quot;none&quot;;document.getElementById(&quot;page2&quot;).style.display = &quot;block&quot;;document.getElementsByClassName('iscount-and-vouchers')[0].click();return false;})();return false;'>Invest & Save</button> <button class='btn btn-primary' onClick='(function(){document.getElementById(&quot;closeme&quot;).visibility = &quot;hidden&quot;;document.getElementById(&quot;closeme&quot;).style.display = &quot;none&quot;;return false;})();return false;'>No thanks</button> </div><div id='page2' style='display:none;'><img src='https://imgur.com/BRxoiCY.png' height='50' width='50'style='margin-left:6px;'/><img src='https://media1.giphy.com/media/nQo3n6D6cba9ALxzH3/giphy.gif?cid=790b7611693add4250ae9d499d3d290b8dcaa805feb9a76b&rid=giphy.gif&ct=g' height='190' width='190' style='margin-left:50px;'/> <h3 style='font-family:Arial, Helvetica, sans-serif; text-align: center; font-size: 1.25rem; font-weight: bold;'>Wise Choice!</h3><h2 style='font-family:Arial, Helvetica, sans-serif; text-align: center; font-size: 1.75rem; font-weight: bold;'>You invested $69.00</h2>  <button class='btn btn-primary' style='margin-left: 120px;' onClick='(function(){document.getElementById(&quot;closeme&quot;).visibility = &quot;hidden&quot;;document.getElementById(&quot;closeme&quot;).style.display = &quot;none&quot;;return false;})();return false;'>Done!</button></div></div> ";

                            const getStorage = async function (key) { return new Promise((resolve, reject) => { try { chrome.storage.sync.get(key, function (value) { resolve(value[key]); }); } catch (ex) { reject(ex); } }); }; function setStorage(key, value) {
                                var storage = chrome.storage.sync; var obj = {}; obj[key] = value; storage.set(obj);
                            }
                            var stack = document.getElementsByTagName('body')[0];
                            stack.insertAdjacentHTML('beforeend', popupHTML);

                            // clear the queue cause we have found what we need and are done
                            queue = "";

                        }
                        break;
                    case Node.ELEMENT_NODE: // 1
                        queue.push(curr.childNodes[i]);
                        break;
                }
            }
        }
    } else if (window.location.href.includes("promoNotification")) {
        const getStorage = async function (key) {
            return new Promise((resolve, reject) => {
                try {
                    chrome.storage.sync.get(key, function (value) {
                        resolve(value[key]);
                    });
                } catch (ex) {
                    reject(ex);
                }
            });
        };
        var grandTotal = await getStorage("grandTotal");
        var newTotal = document.getElementsByClassName('estimated-total-amount amount')[0].querySelector('h3').innerText.trim().substring(1);

        let invested = grandTotal - newTotal;

        var popupHTML = "<div id='closeme' style='position:fixed;width: 300px;height: 400px;top:0;right:0;z-index:999;color: black;margin:8px;background-color: #fbfbfb;border:2px solid gray;border-radius:5px;background-image: url(&quot;https://imgur.com/DdPHEbA.png&quot; );background-position: center;background-repeat: no-repeat; background-size: cover;'><linkhref='https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css' rel='stylesheet'  integrity='sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC'  crossorigin='anonymous'>  <style>  .btn,  .btn-primary {  color: #fff;  background-color: #28a745;   border-color: #1c712f;  margin-left: 10px;    margin-top: 10px;    }   .btn:hover,  .btn-primary:hover   color: #fff; background-color: #1c712f;  border-color: #1c712f;  }   </style> <div id='page2' ><img src='https://imgur.com/BRxoiCY.png' height='50' width='50'style='margin-left:6px;'/><img src='https://media1.giphy.com/media/nQo3n6D6cba9ALxzH3/giphy.gif?cid=790b7611693add4250ae9d499d3d290b8dcaa805feb9a76b&rid=giphy.gif&ct=g' height='190' width='190' style='margin-left:50px;'/> <h3 style='font-family:Arial, Helvetica, sans-serif; text-align: center; font-size: 1.25rem; font-weight: bold;'>Wise Choice!</h3><h2 style='font-family:Arial, Helvetica, sans-serif; text-align: center; font-size: 1.75rem; font-weight: bold;'>You invested $" + invested + "</h2>  <button class='btn btn-primary' style='margin-left: 120px;' onClick='(function(){document.getElementById(&quot;closeme&quot;).visibility = &quot;hidden&quot;;document.getElementById(&quot;closeme&quot;).style.display = &quot;none&quot;;return false;})();return false;'>Done!</button></div></div> ";

        var stack = document.getElementsByTagName('body')[0];
        stack.insertAdjacentHTML('beforeend', popupHTML);

    }
    else if (window.location.href.includes("papa")) {
        console.log("on papa");
        // HTML of the popup that will show when the content is found
        var popupHTML = "<div id='closeme' style='position:fixed;width: 300px;height: 400px;top:0;right:0;z-index:999;color: black;margin:8px;background-color: #fbfbfb;border:2px solid gray;border-radius:5px;background-image: url(&quot;https://imgur.com/DdPHEbA.png&quot; );background-position: center;background-repeat: no-repeat; background-size: cover;'><linkhref='https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css' rel='stylesheet'  integrity='sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC'  crossorigin='anonymous'>  <style>  .btn,  .btn-primary {  color: #fff;  background-color: #28a745;   border-color: #1c712f;  margin-left: 10px;    margin-top: 10px;    }   .btn:hover,  .btn-primary:hover   color: #fff; background-color: #1c712f;  border-color: #1c712f;  }   </style> <div id='page2' ><img src='https://imgur.com/BRxoiCY.png' height='50' width='50'style='margin-left:6px;'/><img src='https://media1.giphy.com/media/nQo3n6D6cba9ALxzH3/giphy.gif?cid=790b7611693add4250ae9d499d3d290b8dcaa805feb9a76b&rid=giphy.gif&ct=g' height='190' width='190' style='margin-left:50px;'/> <h3 style='font-family:Arial, Helvetica, sans-serif; text-align: center; font-size: 1.25rem; font-weight: bold;'>Wise Choice!</h3><h2 style='font-family:Arial, Helvetica, sans-serif; text-align: center; font-size: 1.75rem; font-weight: bold;'>We are applying coupons to find you savings!</h2>  <button class='btn btn-primary' style='margin-left: 120px;' onClick='(function(){document.getElementById(&quot;closeme&quot;).visibility = &quot;hidden&quot;;document.getElementById(&quot;closeme&quot;).style.display = &quot;none&quot;;return false;})();return false;'>Done!</button></div></div> ";

        var stack = document.getElementsByTagName('body')[0];
        stack.insertAdjacentHTML('beforeend', popupHTML);

        var totalText = document.getElementsByClassName('estimated-total-amount amount')[0].querySelector('h3').innerText;
        console.log(totalText);
        if (totalText) {
            var total = parseFloat(totalText.trim().substring(1));
        } else {
            var total = 0;
        }

        chrome.storage.sync.set({ "grandTotal": total }, function () {
            console.log("Total saved");
        });

        let promoCodeInput = document.getElementById('cart-summary-promo');
        let promoCodeButton = document.getElementById('promo-submit');

        promoCodes.forEach((code) => {
            promoCodeInput.value = code;
            promoCodeButton.click();
        });
    }
}
