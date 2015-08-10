import React from 'react';
import Styles from './Search.less';
import SearchService from '../../services/SearchService.js';
import Basic from '../../utils/Basic.js';
import ServiceProviders from '../../constants/ServiceProviders.js';
import KeywordService from '../../services/KeywordService.js';

export default React.createClass({
    getInitialState() {
        let state = {
            keyword: '',
            keywordList: []
        };
        for (let i = 0; i < ServiceProviders.length; i++) {
            state[ServiceProviders[i].name] = []
        }
        return state;
    },

    render() {
        // build result list
        let ResultList = [];
        for (let i = 0; i < ServiceProviders.length; i++) {
            if (this.state[ServiceProviders[i].name].length > 0) {
                ResultList.push(<div className="provider-name">{ServiceProviders[i].title}</div>);
                ResultList.push(this.state[ServiceProviders[i].name].map((item) => {
                    return (
                        <div className="result-item">
                            <div className="image-box">
                                <div className="result-image" style={{backgroundImage: 'url(' + item.img + ')'}}></div>
                            </div>
                            <a href={item.url} target="_blank" className="result-title">{item.title}</a>
                            <p className="result-other">{item.other || ''}</p>
                        </div>
                    );
                }));
            }
        }

        // keyword list
        let KeywordList = [];
        if (this.state.keywordList.length > 0) {
            KeywordList = this.state.keywordList.map((item) => {
                return (
                    <li onClick={this.handleKeywordClick}>{item}</li>
                );
            });
        }

        return (
            <div className="Search">
                <div className="Search-box">
                    <div className="input-box">
                        <input className="keyword-input" onChange={this.handleKeywordInputChange}/>
                        <button className="search-button" onClick={this.handleSearchButtonClick}><i className="fa fa-search"></i></button>
                    </div>
                    <ul className="keyword-list-box">
                        {KeywordList}
                    </ul>
                </div>
                <div className="Search-result">
                    {ResultList}
                </div>
            </div>
        )
    },

    handleKeywordInputChange(e) {
        this.setState({keyword: e.target.value});
        KeywordService.tencent(e.target.value)
            .then((res) => {
                console.log(res);
                this.setState({keywordList: res});
            })
            .catch((err) => {
                this.setState({keywordList: []});
            });
    },

    handleKeywordClick(e) {
        this.setState({keyword: e.target.innerText}, () => {
            this.handleSearchButtonClick();
        });
    },

    handleSearchButtonClick() {
        for (let i = 0; i < ServiceProviders.length; i++) {
            let serviceProvider = ServiceProviders[i].name;
            SearchService[serviceProvider](this.state.keyword)
                .then((array) => {
                    let stateObj = {};
                    stateObj[serviceProvider] = array;
                    this.setState(stateObj);
                })
                .catch((err) => {
                    if (err === 'NO_RESULT') {
                        // pass
                    }
                });
        }
    }
});