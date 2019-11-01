
test('country name', async () => {
    // feth api
    const data = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=Cairo,Egypt&appid=a0b06c5081206c201648b8f3fb6d6fc6`);
    // add content from api to json
    const response = await data.json();
    // test to see outup
    expect(response.sys.country).toBe('EG');
  });
  