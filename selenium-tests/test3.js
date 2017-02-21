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

printBody(driver_chr);
printBody(driver_fx);
// printBody(driver_saf);


function printBody(driver) {
  driver.get('https://cbandrow.github.io/2DoBox-Pivot/');
  driver.findElement(By.id('title-input')).sendKeys('TEST!!');
  driver.findElement(By.id('body-input')).sendKeys('THIS IS A TEST OF THE EMERGENCY BROADCAST SYSTEM: THIS IS ONLY A TEST. PLEASE REMAIN CALM.');
  driver.findElement(By.id('save-button')).click();
  driver.sleep(3000).then(function() {
    driver.findElement(By.className('todo-body')).getText().then(function(body) {
      if(body === 'THIS IS A TEST OF THE EMERGENCY BROADCAST SYSTEM: THIS IS ONLY A TEST. PLEASE REMAIN CALM.') {
        console.log('Test passed');
      } else {
        console.log('Test failed');
      }
    });
  });

  driver.quit();
  }
