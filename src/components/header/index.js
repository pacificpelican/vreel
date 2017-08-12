import { h, Component } from 'preact';
import { Link } from 'preact-router';
import style from './style.less';

export default class Header extends Component {
	render() {
		return (
			<header class={style.header}>
				<span id="logo">
					<a href="http://vreel.pacificio.com">
						<svg id="vReelLogo" alt="vreel">
							<rect x="30" y="6" width="141" height="4"/>
							<circle id="firstCircle" cx="40" cy="23" r="15"/>
							<circle id="firstCircleInner" cx="40" cy="24" r="10"/>
							<circle id="secondCircle" cx="160" cy="23" r="15"/>
							<circle id="secondCircleInner" cx="160" cy="24" r="10"/>
							<text x="62" y="35" font-family="Hack, Menlo, mono" font-size="23">
								vReel
							</text>
						</svg>
					</a>
				</span>
				<nav>
					<a href="http://vreel.pacificio.com">Project Home</a>
					<Link href="/profile">Me</Link>
					<a href="https://djmblog.com">Djmblog</a>
				</nav>
			</header>
		);
	}
}
