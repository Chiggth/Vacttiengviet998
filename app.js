(() => {
  const lessons = window.VACT_LESSONS;
  const workspace = document.querySelector('#workspace');
  const chapterNav = document.querySelector('#chapter-nav');
  const storageKey = 'vact-viet-state-v1';
  const initial = { completed: [], reviewed: [], score: 0, answered: 0, current: 1, streak: 0, chat: [] };
  let state;
  try { state = { ...initial, ...JSON.parse(localStorage.getItem(storageKey) || '{}') }; }
  catch { state = { ...initial }; }
  let route = 'home';
  let activeTab = 'theory';
  let selectedOption = null;
  let answered = false;
  let toastTimer;
  let flashIndex = 0;

  const escapeHTML = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
  const save = () => {
    try { localStorage.setItem(storageKey, JSON.stringify(state)); } catch { showToast('Không thể lưu tiến độ trên thiết bị này.'); }
    updateSidebar();
  };
  const lesson = (id = state.current) => lessons.find((item) => item.id === Number(id)) || lessons[0];
  const percent = () => Math.round((state.completed.length / lessons.length) * 100);
  const sourceTag = (item) => item.pages;

  function updateSidebar() {
    chapterNav.innerHTML = lessons.map((item) => `
      <button class="chapter-item ${Number(state.current) === item.id && route === 'lesson' ? 'current' : ''} ${state.completed.includes(item.id) ? 'done' : ''}" data-lesson="${item.id}" title="${escapeHTML(item.title)}">
        <span class="chapter-number">${String(item.id).padStart(2, '0')}</span>
        <span class="chapter-copy"><strong>${escapeHTML(item.short)}</strong><small>${escapeHTML(item.duration)} · ${escapeHTML(item.tags[0])}</small></span>
        ${state.completed.includes(item.id) ? '<span class="chapter-check" aria-label="Đã hoàn thành">✓</span>' : ''}
      </button>`).join('');
    document.querySelector('#review-count').textContent = String(Math.max(3, lessons.length - state.completed.length)).padStart(2, '0');
    document.querySelector('#streak-number').textContent = `${state.streak} ngày`;
  }

  function setRoute(next, id) {
    route = next;
    if (id) state.current = Number(id);
    if (next === 'lesson') activeTab = 'theory';
    save();
    document.querySelectorAll('[data-route]').forEach((button) => button.classList.toggle('active', button.dataset.route === next || (next === 'lesson' && button.dataset.route === 'home')));
    document.querySelector('#breadcrumb-current').textContent = next === 'lesson' ? lesson().title : ({ home: 'Tổng quan', review: 'Ôn tập', practice: 'Luyện tập', assistant: 'Hỏi trợ lý AI' })[next] || 'Tổng quan';
    document.title = `${next === 'lesson' ? lesson().title : ({ home: 'Tổng quan', review: 'Ôn tập', practice: 'Luyện tập', assistant: 'Trợ lý AI' })[next]} — V-ACT Tiếng Việt`;
    render();
    closeMobileNav();
    if (next === 'home') history.replaceState(null, '', '#home');
    else history.replaceState(null, '', `#${next === 'lesson' ? `phan-${state.current}` : next}`);
  }

  function showToast(message) {
    const toast = document.querySelector('#toast');
    toast.textContent = message;
    toast.classList.add('visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('visible'), 2600);
  }

  function renderHome() {
    const current = lesson();
    workspace.innerHTML = `
      <section class="hero" aria-labelledby="welcome-title">
        <div class="hero-copy">
          <div class="eyebrow"><span class="eyebrow-dot"></span> LỘ TRÌNH V-ACT · TIẾNG VIỆT</div>
          <h1 id="welcome-title">Chào bạn, mình cùng <span class="gradient-text">ôn chắc</span> nhé.</h1>
          <p>Tám chặng kiến thức, ví dụ ngắn và luyện đọc hiểu có giải thích. Học từng phần, ôn lại đúng lúc để tiến bộ bền vững.</p>
          <div class="hero-actions"><button class="button primary" data-action="continue">Tiếp tục học <span aria-hidden="true">→</span></button><button class="button ghost" data-action="review">Ôn kiến thức</button></div>
        </div>
        <div class="hero-art" aria-hidden="true"><div class="study-window"><div class="window-top"><i class="window-dot"></i><i class="window-dot"></i><i class="window-dot"></i><span class="window-title">tổng quan học tập</span><span class="window-status">● ĐANG HỌC</span></div><div class="window-content"><div><div class="window-kicker">CHẶNG TIẾP THEO</div><strong>${escapeHTML(current.title)}</strong><p>${escapeHTML(current.summary)}</p><span class="window-link">Mở bài học →</span></div><div class="progress-ring"><span><strong>${percent()}%</strong><small>hoàn thành</small></span></div></div><div class="float-chip"><b>✦</b> Tiến độ được lưu trên thiết bị</div></div></div>
      </section>
      <section class="section-block" aria-label="Thống kê học tập"><div class="stats-grid">
        <article class="stat-card"><span class="stat-icon">▤</span><div><strong>${state.completed.length} / 8</strong><span>phần đã hoàn thành</span></div></article>
        <article class="stat-card"><span class="stat-icon">◷</span><div><strong>${state.answered}</strong><span>câu đã luyện tập</span></div></article>
        <article class="stat-card"><span class="stat-icon">✳</span><div><strong>${state.answered ? Math.round(state.score / state.answered * 100) : '—'}${state.answered ? '%' : ''}</strong><span>tỉ lệ trả lời đúng</span></div></article>
      </div></section>
      <section class="section-block"><div class="section-heading"><div><h2>Học tiếp theo nhịp của bạn</h2><p>Một chặng ngắn hôm nay cũng là tiến bộ.</p></div><button class="text-link" data-action="all-lessons">Xem lộ trình →</button></div>
        <div class="dashboard-grid"><article class="card continue-card"><span class="lesson-emblem">${escapeHTML(current.icon)}</span><div><div class="card-kicker">CHẶNG ${String(current.id).padStart(2, '0')} · ${escapeHTML(current.duration.toUpperCase())}</div><h3>${escapeHTML(current.title)}</h3><p>${escapeHTML(current.summary)}</p><div class="inline-progress"><div class="progress-track"><span style="width:${state.completed.includes(current.id) ? 100 : 28}%"></span></div><small>${state.completed.includes(current.id) ? 'Đã hoàn thành' : 'Bắt đầu khi bạn sẵn sàng'}</small></div></div><button class="button continue-action" data-action="continue">${state.completed.includes(current.id) ? 'Ôn lại' : 'Vào học'} <span aria-hidden="true">→</span></button></article>
          <article class="card review-card"><div><div class="card-kicker">ÔN TẬP CHỦ ĐỘNG</div><h3>Kiến thức cần nhắc lại</h3><p>Ôn bằng thẻ ghi nhớ và câu hỏi ngắn từ các phần bạn đang học.</p></div><div class="review-bottom"><span>↻ &nbsp;${Math.max(3, lessons.length - state.completed.length)} nội dung</span><button class="text-link" data-action="review">Ôn ngay →</button></div></article></div>
      </section>
      <section class="section-block" id="all-lessons"><div class="section-heading"><div><h2>8 phần lý thuyết</h2><p>Đã chắt lọc từ tài liệu đầu vào, mỗi phần có ví dụ áp dụng.</p></div><span class="text-link">${state.completed.length} / 8 hoàn thành</span></div><div class="lesson-grid">${lessons.map(renderLessonCard).join('')}</div></section>`;
  }

  function renderLessonCard(item) {
    const isDone = state.completed.includes(item.id);
    return `<article class="lesson-card"><div class="lesson-card-top"><span class="lesson-emblem">${escapeHTML(item.icon)}</span><span class="lesson-duration">◷ ${escapeHTML(item.duration)}</span></div><h3>${String(item.id).padStart(2, '0')} · ${escapeHTML(item.title)}</h3><p>${escapeHTML(item.summary)}</p><div class="tag-row">${item.tags.map((tag) => `<span class="tag">${escapeHTML(tag)}</span>`).join('')}</div><div class="lesson-card-bottom">${isDone ? '<span class="done-pill">✓ Đã học</span>' : `<span class="lesson-duration">${escapeHTML(sourceTag(item))}</span>`}<button class="text-link" data-open-lesson="${item.id}">${isDone ? 'Ôn lại' : 'Bắt đầu'} →</button></div></article>`;
  }

  function renderLesson() {
    const item = lesson();
    const tabNames = [['theory', 'Lý thuyết'], ['review', 'Ôn tập'], ['practice', 'Luyện tập'], ['assistant', 'Hỏi AI']];
    workspace.innerHTML = `<header class="lesson-header"><div><div class="eyebrow"><span class="eyebrow-dot"></span> PHẦN ${String(item.id).padStart(2, '0')} · ${escapeHTML(item.tags.join(' / ').toUpperCase())}</div><h1>${escapeHTML(item.title)}</h1><p>${escapeHTML(item.summary)}</p><div class="source-label">Nguồn đã trích lọc · ${escapeHTML(item.pages)} · ${escapeHTML(item.duration)}</div></div><span class="lesson-emblem">${escapeHTML(item.icon)}</span></header>
      <div class="tab-shell"><div class="tablist" role="tablist" aria-label="Nội dung bài học">${tabNames.map(([key, label], index) => `<button class="tab-button" id="tab-${key}" role="tab" aria-controls="panel-${key}" aria-selected="${activeTab === key}" tabindex="${activeTab === key ? 0 : -1}" data-tab="${key}">${label}${key === 'practice' ? ' · 1' : ''}</button>`).join('')}</div></div>
      <section class="tab-panel" id="panel-${activeTab}" role="tabpanel" aria-labelledby="tab-${activeTab}">${activeTab === 'theory' ? renderTheory(item) : activeTab === 'review' ? renderFlashcards(item) : activeTab === 'practice' ? renderQuiz(item) : renderAssistant(item)}</section>`;
  }

  function renderTheory(item) {
    return `<div class="lesson-layout"><div class="theory-list">${item.theory.map(([title, body], index) => `<article class="card theory-card"><h2><span class="theory-index">${String(index + 1).padStart(2, '0')}</span>${escapeHTML(title)}</h2><p>${escapeHTML(body)}</p></article>`).join('')}<div class="hero-actions"><button class="button primary" data-action="mark-done">${state.completed.includes(item.id) ? 'Đã hoàn thành ✓' : 'Đánh dấu đã học'} <span aria-hidden="true">→</span></button><button class="button ghost" data-tab="practice">Làm câu luyện tập</button></div></div><aside class="aside-stack"><article class="card example-card"><div class="example-title"><span>✳</span> Ví dụ áp dụng</div><div class="example-question">${escapeHTML(item.example.prompt)}</div><p class="example-answer">${escapeHTML(item.example.answer)}</p></article><article class="card tip-card"><h3>Gợi ý ghi nhớ</h3><p>${escapeHTML(item.example.tip)}</p></article><article class="card source-card"><strong>Trích từ tài liệu đầu vào</strong>${escapeHTML(item.pages)}<br>Ý chính được diễn giải, chuẩn hóa lỗi OCR và có ví dụ mới để luyện tập.</article></aside></div>`;
  }

  function renderQuiz(item) {
    const q = item.question;
    const letters = ['A', 'B', 'C', 'D'];
    return `<div class="practice-layout"><section class="card question-card"><div class="question-top"><span><strong>CÂU HỎI NHANH</strong> · ${escapeHTML(item.title)}</span><span>01 / 01</span></div><h2>${escapeHTML(q.stem)}</h2><div class="answer-options">${q.options.map((option, index) => `<button class="answer-option ${answered && index === q.answer ? 'correct' : answered && index === selectedOption ? 'incorrect' : ''}" data-option="${index}" aria-pressed="${selectedOption === index}" ${answered ? 'disabled' : ''}><span class="option-key">${letters[index]}</span>${escapeHTML(option)}</button>`).join('')}</div><p class="answer-feedback ${answered ? (selectedOption === q.answer ? 'good' : 'bad') : ''}" aria-live="polite">${answered ? `${selectedOption === q.answer ? 'Chính xác. ' : 'Chưa đúng. '}${escapeHTML(q.explain)}` : 'Chọn một phương án. Sau khi trả lời, bạn sẽ thấy giải thích.'}</p><div class="question-footer"><button class="button ghost" data-tab="theory">← Xem lý thuyết</button><button class="button primary" data-action="${answered ? 'next-question' : 'submit-answer'}" ${selectedOption === null && !answered ? 'disabled' : ''}>${answered ? 'Luyện phần khác' : 'Kiểm tra đáp án'} <span aria-hidden="true">→</span></button></div></section><aside class="quiz-side"><article class="card quiz-side-card"><h3>Luyện từng bước</h3><div class="quiz-meter"><i class="${answered ? 'passed' : 'filled'}"></i><i></i><i></i><i></i></div><p>Mỗi câu có giải thích để bạn hiểu vì sao một đáp án phù hợp với kiến thức.</p></article><article class="card quiz-side-card"><h3>Câu hỏi từ nguồn</h3><p>Bài tập ngắn được biên soạn theo nội dung đã trích lọc ở phần này.</p></article></aside></div>`;
  }

  function dueCard() {
    const item = lessons[flashIndex % lessons.length];
    const concept = item.theory[flashIndex % item.theory.length];
    return { item, concept };
  }

  function renderFlashcards(item = lesson()) {
    const { item: cardLesson, concept } = dueCard();
    return `<div class="review-layout"><section class="card flashcard" id="flashcard"><div class="flashcard-meta"><span>THẺ GHI NHỚ · PHẦN ${String(cardLesson.id).padStart(2, '0')}</span><span>${flashIndex + 1} / ${lessons.length}</span></div><div class="flashcard-front"><div><h2>${escapeHTML(concept[0])}</h2><p>${escapeHTML(cardLesson.summary)}<br><br>Thử tự nhắc lại ý chính, sau đó lật thẻ để xem phần ghi nhớ.</p></div></div><div class="flashcard-back">${escapeHTML(concept[1])}</div><div class="flashcard-actions"><button class="button ghost" data-action="flip-card">Lật thẻ <span aria-hidden="true">↻</span></button><button class="button primary" data-action="next-card">Đã nhớ · thẻ tiếp <span aria-hidden="true">→</span></button></div></section><aside class="review-summary"><article class="card"><div class="card-kicker">ÔN TẬP CÁCH QUÃNG</div><h3>Ghi nhớ chủ động</h3><p>Đọc câu hỏi trước, tự trả lời, rồi mới mở phần giải thích. Nếu còn lúng túng, hãy xem lại lý thuyết và thử lại sau.</p></article><article class="card"><h3>Tiến độ ôn</h3><div class="review-stat"><span>Phần đã xem lại</span><strong>${state.reviewed.length} / 8</strong></div><div class="review-stat"><span>Thẻ đang học</span><strong>${escapeHTML(cardLesson.short)}</strong></div><div class="review-stat"><span>Gợi ý</span><strong>8–10 phút</strong></div></article><button class="button ghost" data-tab="theory">Quay lại ${escapeHTML(item.title)}</button></aside></div>`;
  }

  function renderPractice() {
    const item = lesson();
    return `<header class="lesson-header"><div><div class="eyebrow"><span class="eyebrow-dot"></span> LUYỆN TẬP CÓ GIẢI THÍCH</div><h1>Làm chắc từng dạng câu hỏi.</h1><p>Chọn phần kiến thức, trả lời rồi xem lời giải. Bạn có thể tạo thêm một câu luyện tập theo chủ đề ngay bên cạnh.</p></div><span class="lesson-emblem">▤</span></header><div class="practice-layout"><section class="card question-card"><label class="field-label">Chọn phần muốn luyện<select id="practice-select">${lessons.map((item) => `<option value="${item.id}" ${item.id === Number(state.current) ? 'selected' : ''}>Phần ${String(item.id).padStart(2, '0')} · ${escapeHTML(item.title)}</option>`).join('')}</select></label><div style="block-size:15px"></div>${renderStandaloneQuestion(item)}</section><aside class="card generator-card"><div><div class="eyebrow"><span class="eyebrow-dot"></span> TẠO BÀI TẬP</div><h2 style="margin-block-start:10px">Luyện thêm một câu</h2><p>Tạo một câu hỏi mới dựa trên khái niệm của phần bạn đang học.</p></div><label class="field-label">Độ khó<select id="difficulty"><option value="Cơ bản">Cơ bản</option><option value="Vận dụng">Vận dụng</option></select></label><button class="button primary" data-action="generate-quiz">Tạo bài tập <span aria-hidden="true">✳</span></button><div id="generated-question" class="generator-result" hidden></div><p class="ai-note">Bản demo chạy trực tiếp trên trình duyệt: câu hỏi được tạo theo mẫu từ nội dung học, chưa kết nối dịch vụ AI bên ngoài.</p></aside></div>`;
  }

  function renderStandaloneQuestion(item) {
    const q = item.question;
    const letters = ['A', 'B', 'C', 'D'];
    return `<div class="question-top" style="margin-block-start:19px"><span><strong>CÂU HỎI NHANH</strong> · ${escapeHTML(item.short)}</span><span>01 / 01</span></div><h2>${escapeHTML(q.stem)}</h2><div class="answer-options">${q.options.map((option, index) => `<button class="answer-option ${answered && index === q.answer ? 'correct' : answered && index === selectedOption ? 'incorrect' : ''}" data-option="${index}" aria-pressed="${selectedOption === index}" ${answered ? 'disabled' : ''}><span class="option-key">${letters[index]}</span>${escapeHTML(option)}</button>`).join('')}</div><p class="answer-feedback ${answered ? (selectedOption === q.answer ? 'good' : 'bad') : ''}" aria-live="polite">${answered ? `${selectedOption === q.answer ? 'Chính xác. ' : 'Chưa đúng. '}${escapeHTML(q.explain)}` : 'Chọn một phương án để bắt đầu.'}</p><div class="question-footer"><span class="source-label">${escapeHTML(item.pages)}</span><button class="button primary" data-action="${answered ? 'next-question' : 'submit-answer'}" ${selectedOption === null && !answered ? 'disabled' : ''}>${answered ? 'Câu tiếp theo' : 'Kiểm tra'} →</button></div>`;
  }

  function renderReviewPage() {
    workspace.innerHTML = `<header class="lesson-header"><div><div class="eyebrow"><span class="eyebrow-dot"></span> ÔN TẬP CHỦ ĐỘNG</div><h1>Nhắc lại để nhớ lâu.</h1><p>Thử tự kể lại ý trước khi lật thẻ xem phần tóm tắt.</p></div><span class="lesson-emblem">↻</span></header><section class="tab-panel">${renderFlashcards(lesson())}</section>`;
  }

  function renderAssistant(item = lesson()) {
    const isPage = route === 'assistant';
    const title = isPage ? 'Hỏi bất cứ điều gì bạn đang vướng.' : `Cùng gỡ rối: ${item.title}`;
    const messages = state.chat.length ? state.chat : [{ role: 'assistant', text: `Chào bạn! Mình có thể giúp bạn ôn “${item.title}”. Hãy hỏi về một khái niệm, ví dụ hoặc cách làm câu đọc hiểu.\n\nLưu ý: đây là bản demo hội thoại theo nội dung có sẵn, chưa kết nối mô hình AI bên ngoài.`, lessonId: item.id }];
    workspace.innerHTML = `${isPage ? `<header class="lesson-header"><div><div class="eyebrow"><span class="eyebrow-dot"></span> TRỢ LÝ HỌC TẬP</div><h1>${title}</h1><p>Hỏi về các phần đã học, nhờ giải thích khái niệm hoặc xin một gợi ý để tự làm bài.</p></div><span class="lesson-emblem">✳</span></header>` : `<div style="margin-block-end:15px"><button class="text-link" data-tab="theory">← Quay lại lý thuyết phần ${String(item.id).padStart(2, '0')}</button></div>`}<div class="assistant-layout"><section class="card chat-card"><header class="chat-header"><span class="chat-orb">✳</span><span><strong>Trợ lý V-ACT</strong><small>Học cùng nội dung 8 phần lý thuyết</small></span><i class="online-dot" aria-label="Sẵn sàng"></i></header><div class="chat-messages" id="chat-messages" aria-live="polite">${messages.map(renderMessage).join('')}</div><div class="suggestions"><button class="suggestion" data-prompt="Giải thích khái niệm chính của phần này">Giải thích phần này</button><button class="suggestion" data-prompt="Cho mình một mẹo làm dạng câu hỏi này">Mẹo làm bài</button><button class="suggestion" data-prompt="Tạo một câu hỏi để mình tự luyện">Tự luyện một câu</button></div><form class="chat-compose" id="chat-form"><textarea id="chat-input" rows="1" aria-label="Câu hỏi của bạn" placeholder="Nhập điều bạn muốn hỏi…"></textarea><button class="button primary" type="submit" aria-label="Gửi câu hỏi">↑</button></form></section><aside class="card generator-card"><div><div class="eyebrow"><span class="eyebrow-dot"></span> TẠO BÀI TẬP</div><h2 style="margin-block-start:10px">Luyện theo chủ đề</h2><p>Chọn phần và độ khó để sinh một câu hỏi theo kiến thức đã trích lọc.</p></div><label class="field-label">Phần học<select id="assistant-select">${lessons.map((item) => `<option value="${item.id}" ${item.id === Number(state.current) ? 'selected' : ''}>${String(item.id).padStart(2, '0')} · ${escapeHTML(item.title)}</option>`).join('')}</select></label><label class="field-label">Độ khó<select id="assistant-difficulty"><option value="Cơ bản">Cơ bản</option><option value="Vận dụng">Vận dụng</option></select></label><button class="button primary" data-action="assistant-generate">Tạo bài tập <span aria-hidden="true">✳</span></button><div id="assistant-generated" class="generator-result" hidden></div><div class="ai-note">Bản demo không gửi tin nhắn ra ngoài. Câu trả lời được ghép từ nội dung học có sẵn; câu hỏi tự tạo dùng mẫu cục bộ.</div></aside></div>`;
    const messagesBox = document.querySelector('#chat-messages');
    messagesBox.scrollTop = messagesBox.scrollHeight;
  }

  function renderMessage(message) {
    return `<div class="message ${message.role === 'user' ? 'user' : ''}">${escapeHTML(message.text)}${message.role === 'assistant' ? `<small>Trợ lý · Phần ${String(message.lessonId || state.current).padStart(2, '0')}</small>` : ''}</div>`;
  }

  function render() {
    if (route === 'home') renderHome();
    else if (route === 'lesson') renderLesson();
    else if (route === 'practice') renderPractice();
    else if (route === 'review') renderReviewPage();
    else renderAssistant();
  }

  function submitAnswer() {
    const item = lesson();
    if (selectedOption === null || answered) return;
    answered = true;
    state.answered += 1;
    if (selectedOption === item.question.answer) state.score += 1;
    save();
    render();
  }

  function nextQuestion() {
    selectedOption = null;
    answered = false;
    state.current = Number(state.current) % lessons.length + 1;
    save();
    render();
  }

  function markDone() {
    const id = Number(state.current);
    if (!state.completed.includes(id)) {
      state.completed.push(id);
      state.streak = Math.max(1, state.streak);
      save();
    }
    const dialog = document.querySelector('#feedback-dialog');
    document.querySelector('#dialog-title').textContent = 'Đã hoàn thành một chặng';
    document.querySelector('#dialog-copy').textContent = `Bạn vừa học xong “${lesson(id).title}”. Tiến độ được lưu trên thiết bị này.`;
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else showToast('Đã lưu tiến độ học.');
    render();
  }

  function localAnswer(question, item) {
    const q = question.toLocaleLowerCase('vi');
    if (/tạo|luyện|câu hỏi/.test(q)) return `Thử câu này nhé: ${item.question.stem}\n\n${item.question.options.map((option, index) => `${'ABCD'[index]}. ${option}`).join('\n')}\n\nBạn chọn đáp án nào?`;
    if (/mẹo|cách làm|dạng/.test(q)) return `Mẹo nhanh cho “${item.title}”: ${item.example.tip} Sau đó quay lại câu hỏi và tìm một chi tiết làm căn cứ trước khi chọn.`;
    if (/ví dụ/.test(q)) return `Ví dụ: ${item.example.prompt}\n\n${item.example.answer}`;
    const keywords = item.concepts;
    const found = keywords.find((word) => q.includes(word.toLocaleLowerCase('vi').split(' ')[0])) || keywords[0];
    const matched = item.theory.find(([title]) => title.toLocaleLowerCase('vi').includes(found.toLocaleLowerCase('vi').split(' ')[0])) || item.theory[0];
    return `Trong phần “${item.title}”, ${matched[0].toLocaleLowerCase('vi')} là ý bạn có thể dùng để bắt đầu.\n\n${matched[1]}\n\nBạn muốn thử áp dụng vào ví dụ này không? ${item.example.prompt}`;
  }

  function sendChat(text) {
    const message = text.trim();
    if (!message) return;
    const id = Number(document.querySelector('#assistant-select')?.value || state.current);
    const item = lesson(id);
    state.current = id;
    state.chat.push({ role: 'user', text: message, lessonId: id });
    state.chat.push({ role: 'assistant', text: localAnswer(message, item), lessonId: id });
    state.chat = state.chat.slice(-24);
    save();
    renderAssistant(route === 'lesson' ? lesson() : item);
  }

  function generateQuestion(targetId, resultId, difficultyId) {
    const item = lesson(targetId);
    const difficult = document.querySelector(`#${difficultyId}`)?.value || 'Cơ bản';
    const concept = item.theory[Math.floor(Math.random() * item.theory.length)];
    const prompt = difficult === 'Vận dụng'
      ? `Khi gặp một văn bản liên quan đến “${concept[0].toLocaleLowerCase('vi')}”, bạn nên làm gì trước để tránh suy diễn?`
      : `Ý nào tóm tắt đúng nhất kiến thức “${concept[0]}” trong phần ${item.id}?`;
    const result = document.querySelector(`#${resultId}`);
    result.hidden = false;
    result.innerHTML = `<div class="card-kicker">CÂU HỎI MỚI · ${escapeHTML(difficult.toUpperCase())}</div><h3>${escapeHTML(prompt)}</h3><label class="field-label" for="generated-answer">Hãy viết ngắn gọn câu trả lời của bạn</label><textarea id="generated-answer" rows="3" placeholder="Ghi lại suy nghĩ trước khi xem gợi ý…"></textarea><button class="button ghost" data-action="check-generated" data-target="${resultId}">Xem gợi ý</button><p class="generated-hint" hidden><strong>Gợi ý:</strong> ${escapeHTML(concept[1])}<br><span class="tag">${escapeHTML(item.example.tip)}</span></p>`;
    showToast('Đã tạo câu luyện tập theo nội dung phần học.');
  }

  function openMobileNav() {
    document.querySelector('#sidebar').classList.add('open');
    document.querySelector('#mobile-shade').classList.add('visible');
    document.querySelector('#menu-toggle').setAttribute('aria-expanded', 'true');
  }
  function closeMobileNav() {
    document.querySelector('#sidebar').classList.remove('open');
    document.querySelector('#mobile-shade').classList.remove('visible');
    document.querySelector('#menu-toggle').setAttribute('aria-expanded', 'false');
  }

  document.addEventListener('click', (event) => {
    const button = event.target.closest('button');
    if (!button) return;
    if (button.dataset.route) { selectedOption = null; answered = false; setRoute(button.dataset.route); return; }
    if (button.dataset.lesson) { selectedOption = null; answered = false; setRoute('lesson', button.dataset.lesson); return; }
    if (button.dataset.openLesson) { selectedOption = null; answered = false; setRoute('lesson', button.dataset.openLesson); return; }
    if (button.dataset.tab) {
      activeTab = button.dataset.tab;
      if (route !== 'lesson') { route = 'lesson'; }
      render();
      const active = document.querySelector(`[data-tab="${activeTab}"]`);
      active?.focus({ preventScroll: true });
      return;
    }
    if (button.dataset.option !== undefined && !answered) { selectedOption = Number(button.dataset.option); render(); return; }
    const action = button.dataset.action;
    if (action === 'continue') setRoute('lesson');
    else if (action === 'review') setRoute('review');
    else if (action === 'all-lessons') document.querySelector('#all-lessons')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    else if (action === 'submit-answer') submitAnswer();
    else if (action === 'next-question') nextQuestion();
    else if (action === 'mark-done') markDone();
    else if (action === 'flip-card') document.querySelector('#flashcard')?.classList.toggle('revealed');
    else if (action === 'next-card') { state.reviewed = [...new Set([...state.reviewed, dueCard().item.id])]; flashIndex = (flashIndex + 1) % lessons.length; save(); render(); }
    else if (action === 'generate-quiz') generateQuestion(document.querySelector('#practice-select')?.value || state.current, 'generated-question', 'difficulty');
    else if (action === 'assistant-generate') generateQuestion(document.querySelector('#assistant-select')?.value || state.current, 'assistant-generated', 'assistant-difficulty');
    else if (action === 'check-generated') {
      const result = document.querySelector(`#${button.dataset.target}`);
      const answer = result?.querySelector('#generated-answer');
      if (!answer?.value.trim()) { answer?.focus(); showToast('Hãy thử tự trả lời trước khi xem gợi ý.'); return; }
      result.querySelector('.generated-hint').hidden = false;
      button.textContent = 'Gợi ý đã mở ✓';
    }
  });

  document.addEventListener('change', (event) => {
    if (event.target.id === 'practice-select') {
      state.current = Number(event.target.value); selectedOption = null; answered = false; save(); render();
    }
    if (event.target.id === 'assistant-select') { state.current = Number(event.target.value); save(); }
  });

  document.addEventListener('submit', (event) => {
    if (event.target.id !== 'chat-form') return;
    event.preventDefault();
    const input = document.querySelector('#chat-input');
    sendChat(input.value);
  });
  document.addEventListener('click', (event) => {
    const prompt = event.target.closest('[data-prompt]');
    if (prompt) sendChat(prompt.dataset.prompt);
  });
  document.addEventListener('keydown', (event) => {
    const tab = event.target.closest('[role="tab"]');
    if (!tab || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    const tabs = [...tab.parentElement.querySelectorAll('[role="tab"]')];
    let index = tabs.indexOf(tab);
    if (event.key === 'ArrowRight') index = (index + 1) % tabs.length;
    else if (event.key === 'ArrowLeft') index = (index - 1 + tabs.length) % tabs.length;
    else if (event.key === 'Home') index = 0;
    else index = tabs.length - 1;
    event.preventDefault();
    activeTab = tabs[index].dataset.tab;
    render();
    document.querySelector(`[data-tab="${activeTab}"]`)?.focus();
  });

  document.querySelector('#menu-toggle').addEventListener('click', () => document.querySelector('#sidebar').classList.contains('open') ? closeMobileNav() : openMobileNav());
  document.querySelector('#mobile-shade').addEventListener('click', closeMobileNav);
  document.querySelector('#collapse-chapters').addEventListener('click', (event) => {
    const isHidden = chapterNav.hidden;
    chapterNav.hidden = !isHidden;
    event.currentTarget.setAttribute('aria-label', isHidden ? 'Thu gọn danh sách bài học' : 'Mở danh sách bài học');
    event.currentTarget.textContent = isHidden ? '−' : '+';
  });
  document.querySelector('#feedback-dialog').addEventListener('click', (event) => {
    if (event.target === event.currentTarget) event.currentTarget.close();
  });

  const today = new Intl.DateTimeFormat('vi-VN', { weekday: 'short', day: 'numeric', month: 'short' }).format(new Date());
  document.querySelector('#today-label').textContent = today;
  const hash = location.hash.slice(1);
  const lessonHash = hash.match(/^phan-(\d+)$/);
  if (lessonHash) { route = 'lesson'; state.current = Math.min(8, Math.max(1, Number(lessonHash[1]))); }
  else if (['review', 'practice', 'assistant'].includes(hash)) route = hash;
  updateSidebar();
  document.querySelectorAll('[data-route]').forEach((button) => button.classList.toggle('active', button.dataset.route === route || (route === 'lesson' && button.dataset.route === 'home')));
  document.querySelector('#breadcrumb-current').textContent = route === 'lesson' ? lesson().title : ({ home: 'Tổng quan', review: 'Ôn tập', practice: 'Luyện tập', assistant: 'Hỏi trợ lý AI' })[route];
  render();
})();
