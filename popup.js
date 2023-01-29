window.onload = async function main() {
    // add the event listeners to the buttons
    document.getElementById("complete-onb").addEventListener("click", () => {
        console.log("saving...");
        setStorage("onboardingStatus", true);
        return;
    });
    document.getElementById("logout").addEventListener("click", () => {
        console.log("saving...");
        setStorage("onboardingStatus", false);
        window.close();
        return;
    });
    document.getElementById("onb-next1").addEventListener("click", () => {
        setStorage("userEmail", document.getElementById("inputEmail").value);
        return;
    });
    document.getElementById("onb-next2").addEventListener("click", () => {
        setStorage("userName", document.getElementById("inputFname").value + " " + document.getElementById("inputLname").value);
        return;
    });
    document.getElementById("onb-next2").addEventListener("click", () => {
        setStorage("userDob", document.getElementById("inputDob").value);
        return;
    });
    document.getElementById("onb-next3").addEventListener("click", () => {
        setStorage("userAddress", document.getElementById("inputAdd").value + "\n" + document.getElementById("inputCity").value + ", " + document.getElementById("inputState").value + " " + document.getElementById("inputZip").value);
        return;
    });
    document.getElementById("onb-next3").addEventListener("click", () => {
        setStorage("userPhone", document.getElementById("inputPhone").value);
        return;
    });
    document.getElementById("close-ext1").addEventListener("click", () => { window.close(); return; });
    document.getElementById("close-ext2").addEventListener("click", () => { window.close(); return; });
    document.getElementById("close-ext3").addEventListener("click", () => { window.close(); return; });
    document.getElementById("close-ext4").addEventListener("click", () => { window.close(); return; });
    document.getElementById("close-ext5").addEventListener("click", () => { window.close(); return; });
    document.getElementById("close-ext6").addEventListener("click", () => { window.close(); return; });
    document.getElementById("close-ext7").addEventListener("click", () => { window.close(); return; });
    document.getElementById("close-ext8").addEventListener("click", () => { window.close(); return; });
    document.getElementById("close-ext9").addEventListener("click", () => { window.close(); return; });

    let invamt = await getStorage("investedTotal");
    if (typeof invamt == 'undefined') {
        invamt = "0.00";
    }
    document.getElementById("invest-amt").innerText = (Math.round(invamt * 100) / 100).toFixed(2);

    pageRewrite("tab-account", "tab-home", "tab-tag", "person-butt", "tag-butt");
    pageRewrite("tab-account", "tab-tag", "tab-home", "person-butt", "home-butt");
    pageRewrite("tab-tag", "tab-account", "tab-home", "tag-butt", "home-butt");

    if (await getStorage("onboardingStatus")) {
        document.getElementById("onb1").classList.add('hide-div'); // hide welcome div
        document.getElementById("home").classList.remove('hide-div'); // show the info div
        // document.getElementById("total").innerText = await getStorage("grandTotal");
    } else {
        pageRewrite("", "onb1", "onb2", "", "onb-next1");
        pageRewrite("onb1", "onb2", "onb3", "onb-back2", "onb-next2");
        pageRewrite("onb2", "onb3", "onb4", "onb-back3", "onb-next3");
        pageRewrite("onb3", "onb4", "onb5", "onb-back4", "onb-next4");
        pageRewrite("onb4", "onb5", "onb6", "onb-back5", "onb-next5");
        pageRewrite("onb5", "onb6", "man-bank", "onb-back6", "man-bankbutt");
        pageRewrite("", "man-bank", "onb7", "", "con-man-bank");
        pageRewrite("", "onb7", "home", "", "complete-onb");
        pageRewrite("onb5", "onb6", "onb7", "onb-back6", "");

    }
}

document.getElementById("person-butt").addEventListener("click", async () => {
    document.getElementById("user-email").innerText = await getStorage("userEmail");
    document.getElementById("user-name").innerText = await getStorage("userName");
    document.getElementById("user-dob").innerText = await getStorage("userDob");
    document.getElementById("user-add").innerText = await getStorage("userAddress");
    document.getElementById("user-phone").innerText = await getStorage("userPhone");
    return;
});

// get data from chrome storage
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

// set onboardingStatus chrome storage data
function setStorage(key, value) {
    var storage = chrome.storage.sync;
    var obj = {};
    obj[key] = value;
    storage.set(obj);
    console.log("Status saved");
}

function pageRewrite(last, curr, next, bacbutt, forbutt) {
    if (forbutt != "" && next != "") {
        document.getElementById(forbutt).addEventListener("click", () => {
            console.log("pressed butt w id" + forbutt);
            document.getElementById(curr).classList.add('hide-div');
            document.getElementById(next).classList.remove('hide-div');
        });
    }
    if (bacbutt != "" && last != "") {
        document.getElementById(bacbutt).addEventListener("click", () => {
            document.getElementById(curr).classList.add('hide-div');
            document.getElementById(last).classList.remove('hide-div');
        });
    }
}