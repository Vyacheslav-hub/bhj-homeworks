document.addEventListener('DOMContentLoaded', async () => {
    const titlePoll = document.querySelector('#poll__title');
    const answersPoll = document.querySelector('#poll__answers');
    let indexBtn;
    let pollId;
    let timer;

    await getFetchPoll();
    async function getFetchPoll () {
        try {
            const response = await fetch('https://students.netoservices.ru/nestjs-backend/poll');

            if (!response.ok) throw new Error(`Ошибка запроса опроса: ${response.status}`);

            const polls = await response.json();

            const data ={
                id: polls.id,
                title: polls.data.title,
                answers: polls.data.answers,
            };

            pollId = data.id;

            await renderTitle(data);
            await renderAnswers(data);

        }catch (e) {
            console.error(`Ошибка запроса опроса: ${e.message}`);
            throw e;
        }
    }

     function renderTitle (data) {
        titlePoll.textContent = '';
        titlePoll.textContent = data.title;
    }

    function renderAnswers (data){
        answersPoll.innerHTML = '';
        const {answers: answer} = data;

        for (let i = 0; i <= answer.length - 1; i++) {
            const btn = document.createElement('button');
            btn.classList.add('poll__answer');
            btn.textContent = answer[i];
            answersPoll.append(btn);
        }
    }

     answersPoll.addEventListener('click', (e) => {
        const btn = e.target.closest('.poll__answer');

        if (!btn) return;

        const buttons = Array.from(answersPoll.querySelectorAll('.poll__answer'));

        indexBtn = buttons.indexOf(btn);
        alert('Спасибо, ваш голос засчитан!');
         postFetchPoll ()
    })

    async function postFetchPoll (){
        try {
            const response = await fetch('https://students.netoservices.ru/nestjs-backend/poll', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                },
                body: `vote=${pollId}&answer=${indexBtn}`
            })

            if (!response.ok) throw new Error(`Ошибка отправки запроса: ${response.status}`);

            const result = await response.json();

            const data = result.stat.map(item => ({
                answer: item.answer,
                vote: item.votes,
            }))

            renderResult (data);
        }catch (e) {
            console.error(`Ошибка отправки запроса: ${e.message}`);
            throw e;
        }

    }

    function renderResult (data) {
        let count = 0;
        answersPoll.innerHTML = '';
        data.forEach(item => {
            count += item.vote;
        })

        data.forEach(item => {
            const percent = Math.round((item.vote / count) * 100)

            const div =document.createElement('div')
            div.classList.add('poll__result')
            div.textContent = `${item.answer}: ${percent}% (${item.vote})`
            answersPoll.append(div)
        })

        clearTimeout(timer);
        timer = setTimeout(getFetchPoll, 3000);
    }
})
