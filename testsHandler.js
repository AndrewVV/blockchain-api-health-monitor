if (res.result === true && res.number) {
    console.log("Test passed");
    return (resolve = true);
} else {
    console.log(`test failed`);
    return (resolve = false);
}


if (res.result === true && res.balance) {
    console.log("Test passed");
    return (resolve = true);
} else {
    console.log(`test failed`);
    return resolve(false);
}


if (res.result === true && res.txHash) {
    console.log("Test passed:)");
    return true;
} else if (res.result === false && res.message) {
    console.log(`test failed`);
    return res.message;
}