async function getFortuneCookieAdvice() {
  const url = "https://api.adviceslip.com/advice";
  const response = await fetch(url);
  const results = await response.json();

  const advice = results.slip.advice;

  const fortuneCookieText = document.querySelector("#fortuneCookieAdvice");
  fortuneCookieText.innerText = `"${advice}"`;
}

getFortuneCookieAdvice();
