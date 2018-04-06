//  vreel app by Dan McKeown copyright 2017 http://danmckeown.info
import { h, Component } from 'preact';
import style from './style.less';
import axios from 'axios';

var directory = "/public/";

class Upload extends Component {
	render() {
		return (
			<article id="lower_article" className="page_element">
				<h3 id="upload_h3">Upload</h3>
				<div>
					<form id="uploadForm" action="http://localhost:3004/upload" method="post" encType="multipart/form-data">
						<input type="file" name="sampleFile" />
						<span className="upload_form_field top_sec" id="actorV">Actor 1: <input type="text" id="vActor1" name="vActor1" /></span>
						<span className="upload_form_field" id="yearV">Year: <input type="text" id="vYear" name="vYear" /></span>
						<span className="upload_form_field" id="descriptionV">Description: <input type="text" id="vDescription" name="vDescription" /></span>
						<span className="upload_form_field" id="nameV">Name: <input type="text" id="vName" name="vName" /></span>
						<span className="upload_form_field" id="actorV2">Actor 2: <input type="text" id="vActor2" name="vActor2" value="n/a" /></span>
						<input type="submit" value="Upload!" />
					</form>
				</div>
			</article>
		);
	}
}

var instance = axios.create({
	baseURL: 'http://localhost:3004',
	timeout: 2000,
});

var mainVidList = {};

class LatestVideo extends Component {
	constructor() {
		super();

		var that = this;
        instance.get('/listlatest')
            .then(function (response) {
				that.setState({VideosList: response.data});
				response.data.reverse();	//	FIRST IN LAST OUT [or last on list]
				mainVidList = response.data;
				that.mainVidList = response.data;
				var resArr = [];
				if ((response.data !== "[]") && (response.data !== "{content: 'none'}") && (response.data[0] !== undefined) && (response.data[0] !== null)) {
					for (let i=0; i<response.data.length; i++) {
						resArr.push(response.data[i].vFile);
					}

					localStorage.setItem('recents', resArr);

					that.setState({latestVideoLink: directory + response.data[0].vFile + '/link'});
					that.setState({latestVideoStar: response.data[0].vActor1});
					that.setState({latestVideoFull: '/thisvideo/' + response.data[0].vFile});
				}
				else {
					console.log('No video list data retrieved.');
					localStorage.setItem('recents', "NO CONTENT YET");
				}
            })
            .catch(function (error) {
                alert(error);
            });
	}
	render() {
		return (
				<article id="latest_video" className="page_element">
					<div><span id="vTitle">Current Video</span> starring <span id="act1">{this.state.latestVideoStar}</span></div>
					<iframe src={this.state.latestVideoFull}></iframe>
					<p><a href={this.state.latestVideoFull} id="vidlink">view</a></p>
					<p><a href={this.state.latestVideoLink} id="vidlink">download</a></p>
				</article>
				);
	}
}

class ListVideos extends Component {
	constructor() {
		super();

		var that = this;
	}
	render() {
		var vidList = "<ol id='recent_videos_list'>";
		var newVidList = localStorage.getItem('recents');
		newVidList = newVidList + ",";

		function arrayBuilder(stringWithCommas, maxLength=21) {
			var retArr = [];
			var currentChars = "";	//	this prevents adding 'undefined' to the first item
			var arrayItems = 0;
			if (stringWithCommas === null) {
				stringWithCommas = "";
			}
			for (var i=0; i<=stringWithCommas.length; i++) {
				if (stringWithCommas[i] !== ",") {
					currentChars = currentChars + stringWithCommas[i];
				}
				else if ((stringWithCommas[i] === ",") && (retArr.length < maxLength)) {
					retArr.push(currentChars);
					currentChars = "";
					arrayItems++;
				}
			}
			if (i < maxLength-1) {	//	This makes sure that the last item isn't a leftovers pile of before-latest-20 videos
				retArr.push(currentChars);	//	this takes the last item and adds it to the array
			}

		 	retArr.shift();		//	This removes the most recent video (which should be displayed in LatestVideo)
			return retArr;
		}

		vidList = arrayBuilder(newVidList);

		var urlString = '/thisvideo/';

		return (
				<div>
					<h3 id="recent_videos">Recent Videos <a id="click_refresh" href="../">reload</a></h3>
					<ol>
						{vidList.map(function(name, index){
							return <li key={ index }><a href={urlString + name}>{name}</a></li>;
						})}
					</ol>
				</div>
				);
	}
}

export default class Home extends Component {
	render() {
		return (
			<div class={style.home}>
				<div id="main">
					<article id="lead_article" class="page_element">
						<ListVideos />
					</article>
					<LatestVideo />
					<Upload />
					<section id="below_section" class="page_element secondary">3</section>
					<aside id="sidebar" class="page_element secondary">4</aside>
					<section id="another_section" class="page_element secondary">4.5</section>
					<aside id="sidebar2" class="secondary">5</aside>
					<data-arbitrary-element id="arbitrary" class="page_element secondary">6</data-arbitrary-element>
					<data-arbitrary-element id="arbitrary2" class="page_element secondary">7</data-arbitrary-element>
					<data-arbitrary-element id="arbitrary3" class="page_element secondary">8</data-arbitrary-element>
					<data-arbitrary-element id="arbitrary3" class="page_element secondary">9</data-arbitrary-element>
					<data-arbitrary-element id="arbitrary3" class="page_element secondary">10</data-arbitrary-element>
					</div>
					<footer class="page_element">vreel was created by <a href="http://danmckeown.info">Dan McKeown</a></footer>
			</div>
		);
	}
}
