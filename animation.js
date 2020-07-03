const ball = document.querySelector('.ball');
const btn = document.querySelector('.btn-action');
const spring = document.querySelector('.spring');
const fill = document.querySelector('.fill');

const strechSpring = () => {
  fill.style.animationName = 'fill';
  fill.style.animationPlayState = 'running';
  spring.style.animationPlayState = 'running';
  btn.textContent = 'Puść sprężyne';
  btn.removeEventListener('mousedown', strechSpring);
  btn.removeEventListener('touchstart', strechSpring);
};

const releaseSpring = () => {
  const fillStyles = getComputedStyle(fill);
  const fillWidth = parseInt(fillStyles.width, 10);
  const barWidth = parseInt(
    getComputedStyle(document.querySelector('.bar')).width,
    10
  );

  const progressPercent = (fillWidth / barWidth).toFixed(2);
  btn.style.backgroundColor = 'red';
  btn.textContent = `Moc uderzenia to: ${(progressPercent * 100).toFixed()}%`;
  fill.style.animationPlayState = 'paused';

  document.documentElement.style.setProperty(
    '--power-x',
    `${30 + progressPercent * 50}%`
  );
  ball.style.animation = `fly-ball-x 1s .15s 1 forwards cubic-bezier(0.17, 0.67, 0.6, 1),fly-ball-y linear 1s .15s 1 forwards`;

  const springLeft = getComputedStyle(spring).left;
  console.log(getComputedStyle(spring).transform);

  document.documentElement.style.setProperty('--spring-left', springLeft);
  spring.style.animation = `release-spring forwards 0.2s 1`;

  btn.removeEventListener('mouseup', releaseSpring);
  btn.removeEventListener('touchend', releaseSpring);

  ball.addEventListener('animationend', resetAnimation);
};

const resetAnimation = () => {
  ball.removeEventListener('animationend', resetAnimation);

  setTimeout(() => {
    btn.addEventListener('mousedown', strechSpring);
    btn.addEventListener('mouseup', releaseSpring);
    btn.addEventListener('touchstart', strechSpring);

    btn.textContent = 'Naciągnij sprężyne';
    btn.style.backgroundColor = 'brown';
    btn.addEventListener('touchend', releaseSpring);

    spring.style.animation = '';
    ball.style.animation = '';
    fill.style.animationName = 'none';
  }, 2000);
};

btn.addEventListener('mousedown', strechSpring);
btn.addEventListener('mouseup', releaseSpring);
btn.addEventListener('touchstart', strechSpring);
btn.addEventListener('touchend', releaseSpring);
