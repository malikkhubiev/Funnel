const API_BASE = 'https://aim-pay-bot-server-4c57.onrender.com';

function getLeadId() {
  const url = new URL(window.location.href);
  return url.searchParams.get('lead_id');
}

async function sendProgress(step, answer) {
  const leadId = getLeadId();
  if (!leadId) return; // тихо выходим, если не знаем лида
  try {
    await fetch(`${API_BASE}/form_warm/clients/${leadId}/answers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ step, answer })
    });
  } catch (_) {}
}

const quizData = [
  {
    type: 'reveal',
    title: '1. Закономерность 🔥',
    question: 'Мы заметили прямую связь между Числом пожарных🚒 и Величиной разрушений💥.<br>Значит ли это, что для тушения пожара нужно звать как можно меньше пожарных?🔥✅🔥',
    answer: 'Ответ: Ущерб не из-за пожарных.<br><br>Есть 3-ий фактор, который:<br>1. Вызывает ущерб<br>2. Из-за которого приходится звать много пожарных.<br><br>Этот фактор - ОГРОМНЫЙ ПОЖАР 🔥🔥🔥.<br><br>Не звать пожарных - большая глупость.'
  },
  {
    type: 'reveal',
    title: '2. Закономерность 🍧',
    question: 'Чем больше продают мороженого, тем больше людей утонуло. Запретить мороженое?',
    answer: 'Ответ: Есть третий фактор, который является причиной обоих явлений - ЖАРА 🌅.<br><br>Жара → люди больше покупают мороженого и чаще купаются → увеличивается вероятность утоплений.<br><br>А мороженое - это вкусно)'
  },
  {
    type: 'reveal',
    title: '3. Закономерность 📖',
    question: 'Чем больше книг в доме, тем лучше учится ребёнок. Достаточно завалить дом книгами?',
    answer: 'Ответ: Есть третий фактор, который является причиной обоих явлений - социально-экономический статус и вовлеченность родителей. 💎🎓<br><br>Образованные, обеспеченные родители склонны иметь много книг и больше внимания уделять образованию детей. 👩‍👧‍👦🧠'
  },
  {
    type: 'reveal',
    title: '4. Медицина 🧑‍⚕️',
    question: 'Модель поставила диагноз «рак». Можно ли так и сказать пациенту без объяснений?',
    answer: 'Ответ: Нет.<br><br>Врачу нужно объяснение: «Модель выделила вот этот участок на снимке с такими-то характеристиками (неровные края, высокая плотность), что с высокой вероятностью указывает на злокачественность».<br><br>Дальше это можно перепроверить и, если ошибок нет, тогда ставим диагноз.'
  },
  {
    type: 'reveal',
    title: '5. Инвестиции 💸',
    question: 'Модель говорит не покупать акции. Можно ли слепо следовать предсказанию?',
    answer: 'Ответ: Нет.<br><br>Разумный инвестор не следует слепо чужим указаниям.<br><br>Ему нужны аргументы: "У компании высокое соотношения долга к доходу, нет стабильного потока клиентов, им один раз выделили деньги, но они не доказали, что умеют ими эффективно распоряжаться."'
  },
  {
    type: 'reveal',
    title: '6. Смещение выборки 🗽',
    question: 'Опрос 1936 года предсказал неверного победителя. Почему?',
    answer: 'Ответ: Всё дело в смещении выборки.<br><br>Опрашивали владельцев телефонов/подписчиков — в основном богатых, не репрезентативно.<br><br>Если в дорогом отеле в Дубае 0% опрошенных едят быстрорастворимую лапшу, это не значит, что в 2025 году её больше не покупают.'
  },
  {
    type: 'choice',
    title: '7. Оцените ваш интерес к ML (1–10)',
    options: Array.from({ length: 10 }, (_, i) => String(i + 1))
  },
  {
    type: 'choice',
    title: '8. Насколько готовы изучать ML (1–10)',
    options: Array.from({ length: 10 }, (_, i) => String(i + 1))
  },
  {
    type: 'choice',
    title: '9. Вы умеете пользоваться Телеграмом?',
    options: ['Нет ❌', 'Да ✅']
  },
  {
    type: 'choice',
    title: '10. Решение о курсе',
    options: ['Хочу купить курс сейчас 💰', 'Хочу изучить программу подробнее 📖']
  }
];

function renderStep(container, stepIndex, onDone) {
  container.innerHTML = '';
  if (stepIndex >= quizData.length) {
    const done = document.createElement('div');
    done.className = 'question';
    const h = document.createElement('h3');
    h.innerHTML = 'Поздравляем!<br>Вы прошли тест 🎉';
    const p = document.createElement('p');
    p.textContent = 'Спасибо за участие!';
    p.classList.add("thanks")
    done.appendChild(h);
    done.appendChild(p);
    container.appendChild(done);
    return;
  }

  const item = quizData[stepIndex];
  const wrap = document.createElement('div');
  wrap.className = 'question';

  const title = document.createElement('h3');
  title.innerHTML = item.title;
  wrap.appendChild(title);

  const body = document.createElement('div');
  const next = document.createElement('button');
  next.textContent = 'Далее →';
  next.classList.add("right")
  next.disabled = true;
  next.addEventListener('click', () => onDone());

  if (item.type === 'reveal') {
    const q = document.createElement('p');
    q.textContent = item.question;
    const reveal = document.createElement('button');
    reveal.classList.add("right")
    reveal.textContent = '✅ Правильный ответ';
    reveal.addEventListener('click', () => {
      reveal.disabled = true;
      const ans = document.createElement('div');
      ans.className = 'answer';
      ans.innerHTML = item.answer;
      body.appendChild(ans);
      next.disabled = false;
      // фиксируем клик по кнопке ответа для шагов 1-6
      sendProgress(stepIndex + 1, 'reveal_clicked');
    });
    body.appendChild(q);
    body.appendChild(reveal);
  } else if (item.type === 'choice') {
    const btns = document.createElement('div');
    btns.className = 'answers';
    item.options.forEach(opt => {
      const b = document.createElement('button');
      b.textContent = opt;
      b.addEventListener('click', () => {
        btns.querySelectorAll('button').forEach(x => x.disabled = true);
        b.classList.add('selected');
        next.disabled = false;
        // фиксируем выбранный вариант для шагов 7-9
        sendProgress(stepIndex + 1, opt);
      });
      btns.appendChild(b);
    });
    body.appendChild(btns);
  }

  wrap.appendChild(body);
  const footer = document.createElement('div');
  footer.className = 'footer';
  footer.appendChild(next);
  wrap.appendChild(footer);
  container.appendChild(wrap);
}

(function init() {
  const root = document.getElementById('quiz');
  let step = 0;
  const next = () => {
    step += 1;
    renderStep(root, step, next);
  };
  renderStep(root, step, next);
})();
