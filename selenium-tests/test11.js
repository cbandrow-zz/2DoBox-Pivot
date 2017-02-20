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

searchTest(driver_chr);
searchTest(driver_fx);
// searchTest(driver_saf);


function searchTest(driver) {
  driver.get('https://cbandrow.github.io/2DoBox-Pivot/');
  driver.findElement(By.id('title-input')).sendKeys('TEST!!');
  driver.findElement(By.id('body-input')).sendKeys('THIS IS A TEST OF THE EMERGENCY BROADCAST SYSTEM: THIS IS ONLY A TEST. PLEASE REMAIN CALM.');
  driver.findElement(By.id('save-button')).click();
  driver.navigate().refresh();
  driver.findElement(By.className('idea-title')).click();
  driver.findElement(By.className('idea-title')).clear();
  driver.findElement(By.className('idea-title')).sendKeys(Key.DELETE);
  // var element = driver.findElement(By.className('idea-title'));
  // element.doubleClick();
  // element.sendKeys("new test");
  // driver.findElement(By.className('idea-title')).sendKeys(Key.META, "a", Key.NULL, "new test");
  driver.findElement(By.className('make-idea-teal')).click();


  driver.sleep(3000).then(function() {
    driver.findElement(By.className('idea-title')).getText().then(function(title) {
      if(title === 'new test') {
        console.log('Test passed');
      } else {
        console.log('Test failed');
      }
    });
  });

  driver.quit();
  }
