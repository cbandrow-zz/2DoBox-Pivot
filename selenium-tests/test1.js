var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var driver_chr = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

var driver_fx = new webdriver.Builder()
    .forBrowser('firefox')
    .build();

var driver_saf = new webdriver.Builder()
    .forBrowser('safari')
    .build();

searchTest(driver_chr);
searchTest(driver_fx);
searchTest(driver_saf);

function searchTest(driver) {
  driver.get('https://cbandrow.github.io/2DoBox-Pivot/');

  driver.sleep(2000).then(function() {
    driver.getTitle().then(function(title) {
      if(title === 'idea box') {
        console.log('Test passed');
      } else {
        console.log('Test failed');
      }
    });
  });

  driver.quit();
}
