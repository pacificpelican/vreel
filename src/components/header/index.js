import { h, Component } from 'preact';
import { Link } from 'preact-router';
import style from './style.less';

export default class Header extends Component {
	render() {
		return (
			<header class={style.header}>
				<h1><a href="../">vreel App</a></h1>
				<div id="logo">
					<a href="http://vreel.pacificio.com">
						<svg id="vReelLogo">
							<rect x="30" y="4" width="241" height="10"/>
							<circle id="firstCircle" cx="40" cy="32" r="30"/>
							<circle id="firstCircleInner" cx="40" cy="33" r="20"/>
							<circle id="secondCircle" cx="260" cy="32" r="30"/>
							<circle id="secondCircleInner" cx="260" cy="33" r="20"/>
							<text x="95" y="55" font-family="Hack, Menlo, mono" font-size="35">
								vReel
							</text>
						</svg>
					</a>
				</div>
				<nav>
					<a href="http://vreel.pacificio.com">Project Home</a>
					<Link href="/profile">Me</Link>
					<a href="https://djmblog.com">Djmblog</a>
				</nav>
			</header>
		);
	}
}
