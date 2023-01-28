window.onload = async function main() {
    // add the event listeners to the buttons

    document.getElementById("close-ext").addEventListener("click", () => { window.close(); return; });

    if (await getStorage("onboardingStatus")) {

    } else {
        pageRewrite("onb1", "onb2", "onb-next1");
        pageRewrite("onb2", "onb3", "onb-next2");
        pageRewrite("onb3", "onb4", "onb-next3");
        pageRewrite("onb4", "onb5", "onb-next4");
        pageRewrite("onb5", "onb6", "onb-next5");
        pageRewrite("onb6", "onb7", "onb-next6");
    }
}

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
function setOnboardingStatus(value) {
    chrome.storage.sync.set({ "onboardingStatus": value }, function () {
        console.log("Status saved");
    });
}

function pageRewrite(curr, dest, butt) {
    document.getElementById(butt).addEventListener("click", () => {
        document.getElementById(curr).classList.add('hide-div');
        document.getElementById(dest).classList.remove('hide-div');
        return;
    })
}