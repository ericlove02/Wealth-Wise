const promoCodes = ["100OFF", "15OFF"];

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
                        var popupHTML = "<div style='position:fixed;top:0;right:0;z-index:999;color:red'>DETECTED " + total + "</div>";

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
}
else if (window.location.href.includes("asos")) { }