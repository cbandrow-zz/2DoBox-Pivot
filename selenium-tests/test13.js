var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;


var driver_chr = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

var driver_fx = new webdriver.Builder()
    .forBrowser('firefox')
    .build();

// var driver_saf = new webdriver.Builder()
//     .forBrowser('safari')
//     .build();

deleteCard(driver_chr);
deleteCard(driver_fx);
// editTitle(driver_saf);


function deleteCard(driver) {
 driver.get('https://cbandrow.github.io/2DoBox-Pivot/');
 driver.findElement(By.id('title-input')).sendKeys('Added Test');
 driver.findElement(By.id('body-input')).sendKeys('More testing content.');
 driver.findElement(By.id('save-button')).click();
 driver.sleep(1500);
 driver.findElement(By.id('title-input')).sendKeys('Some more test');
 driver.findElement(By.id('body-input')).sendKeys('adding test stuff.');
 driver.findElement(By.id('save-button')).click();
 driver.sleep(1500);
 driver.findElement(By.className('delete-button')).click();

 driver.sleep(3000).then(function() {
   driver.findElement(By.className('todo-title')).getText().then(function(title) {
     if(title != 'Some more test') {
       console.log('Test passed');
     } else {
       console.log('Test failed');
     }
   });
 });
 driver.quit();
 }
