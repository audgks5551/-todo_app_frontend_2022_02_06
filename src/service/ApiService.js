import { API_BASE_URL } from "../app-config";

export function call(api, method, request) {
    let options = {
        headers: new Headers({
            "Content-Type": "application/json",
        }),
        url: API_BASE_URL + api,
        method: method
    };

    if (request) {
        options.body = JSON.stringify(request);
    }

    // fetch(url, {header, url, method})하면 reponse생성 => json화 => 
    // promise는 자바스크립트 비동기 처리에 사용되는 객체
    // promise.rejected(거부) : 처리가 실패로 끝난 상태
    // then 메소드는 해당 Promise 가 성공했을 때의 동작을 지정합니다. 인자로 함수를 받습니다.
    // catch 메소드는 해당 Promise 가 실패했을 때의 동작을 지정합니다. 인자로 함수를 받습니다.
    return fetch(options.url, options)
                .then((response) => response.json()
                        .then( (json) => {
                            console.log(response);
                            if (!response.ok) {
                                // 디버깅 목적 및 선택된 오류를 잡기 위해 유용
                                return Promise.reject(json);
                            }
                            return json;
                        }))
}