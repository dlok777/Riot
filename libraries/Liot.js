const fs = require('fs');

import('node-fetch').then((nodeFetch) => {
  
}).catch((error) => {
  console.error('모듈을 불러오는 중 오류 발생:', error);
});



  class Liot {
    static init() {
      const data = fs.readFileSync('./config.json', 'utf8');
      const config = JSON.parse(data);
      this.siteInfo = {
        'apiKey': config.API_KEY,
        'baseUrl': 'https://kr.api.riotgames.com'
      };
      this.userInfo = {};
    }

    static async fetch(url, options={}, params={}) {
      if(!this.siteInfo) this.init(); 

      const res = await fetch(url, {
          ...options,
          headers: {
              ...options.headers,
          }
      });

      return res;
    }


    static async getUserInfo(summonerName) {
      if(!this.siteInfo) this.init(); 

      const url = this.siteInfo.baseUrl + "/lol/summoner/v4/summoners/by-name/" + encodeURI(summonerName) + "?api_key=" + this.siteInfo.apiKey;
      const res = await this.fetch(url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          "Accept-Language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
          "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
          "Origin": "https://developer.riotgames.com"
        }
      })
      .catch((error) => {
        console.error('getUserInfo Error : ', error);
      })
      .then((res) => {
        return res.json();
      });
      this.userInfo = {
        ...this.userInfo,
        ...res
      }

      return this.userInfo;
    }
  }

module.exports = Liot;