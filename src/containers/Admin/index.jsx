/* eslint react/prefer-stateless-function: 0 */

import React, { Component } from 'react';
import { string, number, func } from 'prop-types';
import { Helmet } from 'react-helmet';

import { __, $$ } from '../../utils/localize';
import { analLabsSectionView } from '../../utils/analytics';

import SectionContent from '../../components/SectionContent';
import NextChapter from '../../components/NextChapter';
import ChapterVisitor from '../../components/ChapterVisitor';

import './style.scss';

class Labs extends Component {
    componentDidMount() {
        window.addEventListener('scroll', this.trackSectionViews);
        const projectVideos = this.projectsContainer.querySelectorAll('.labs__project-video');
        setTimeout(() => {
            for (let i = 0; i < projectVideos.length; i += 1) {
                projectVideos[i].play();
            }
        }, 100);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.trackSectionViews);
    }

    getChildRef(idx, ref) {
        this[`section${idx}El`] = ref;
    }

    section0Viewed = false;
    section1Viewed = false;
    section2Viewed = false;

    trackSectionViews = () => {
        const { section0El, section1El, section2El } = this;
        const docScrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (section0El.offsetTop < docScrollTop
            && section0El.offsetTop + section0El.offsetHeight > docScrollTop
            && !this.section0Viewed) {
            analLabsSectionView(0);
            this.section0Viewed = true;
        }
        if (section1El.offsetTop < docScrollTop
            && section1El.offsetTop + section1El.offsetHeight > docScrollTop
            && !this.section1Viewed) {
            analLabsSectionView(1);
            this.section1Viewed = true;
        }
        if (section2El.offsetTop < docScrollTop
            && section2El.offsetTop + section2El.offsetHeight > docScrollTop
            && !this.section2Viewed) {
            analLabsSectionView(2);
            this.section2Viewed = true;
        }
    }

    render() {
        const arrHeadMetaTags = [];
        window.seoStrings.metatags.lab.names.forEach((objName) => {
            arrHeadMetaTags.push(
                <meta name={objName.name} content={objName.content} />
            );
        });

        window.seoStrings.metatags.lab.properties.forEach((objProperty) => {
            arrHeadMetaTags.push(
                <meta property={objProperty.property} content={objProperty.content} />
            );
        });

        return (
            <div className="container container--chapter container--labs">
                <Helmet>
                    <title>{window.seoStrings.title.lab}</title>
                    <meta name="description" content={window.seoStrings.description.lab} />
                    {arrHeadMetaTags}
                </Helmet>
                <SectionContent>
                    <div className="section-content__header">
                        <img src={$$('labsIcon')} className="section-icon" alt="" />
                        <div className="copy section-content__copy">
                            {__('labsBody')}
                            <p>
                                <a
                                    href={__('labsLearnMoreCtaUrl')}
                                    className="link link--external"
                                    target="_blank"
                                >
                                    {__('labsLearnMoreCta')}
                                </a>
                            </p>
                        </div>
                    </div>
                    <ul
                        ref={(el) => { this.projectsContainer = el; }}
                        className="labs__project-list"
                    >
                        <Project
                            url={__('labsInnovationHeader0Url')}
                            header={__('labsInnovationHeader0')}
                            body={__('labsInnovationBody0')}
                            img={$$('labsInnovationImage0')}
                            getRef={el => this.getChildRef(0, el)}
                        />
                        <Project
                            url={__('labsInnovationHeader1Url')}
                            header={__('labsInnovationHeader1')}
                            body={__('labsInnovationBody1')}
                            img={$$('labsInnovationImage1')}
                            getRef={el => this.getChildRef(1, el)}
                        />
                        <Project
                            url={__('labsInnovationHeader2Url')}
                            header={__('labsInnovationHeader2')}
                            body={__('labsInnovationBody2')}
                            img={$$('labsInnovationImage2')}
                            getRef={el => this.getChildRef(2, el)}
                        />
                    </ul>
                </SectionContent>
                <NextChapter />
                <ChapterVisitor chapterIndex={this.props.chapterIndex} />
            </div>
        );
    }
}

function Project({ url, header, body, img, getRef }) {
    const media = img.indexOf('.mp4') > -1 ?
        <video src={img} className="labs__project-video" autoPlay playsInline loop /> :
        <img src={img} alt={header} className="labs__project-image" />;

    return (
        <li className="labs__project" ref={(el) => { getRef(el); }}>
            {media}
            <div className="labs__project-info">
                <h2 className="copy copy--header">
                    {(() => {
                        if (url === '' || url === false) {
                            return (
                                <p>{header}</p>
                            );
                        }
                        return (
                            <a href={url}>{header}</a>
                        );
                    })()}
                </h2>
                <p className="copy section-content__copy">{body}</p>
            </div>
        </li>
    );
}

Labs.propTypes = {
    chapterIndex: number.isRequired,
};

Project.propTypes = {
    url: string.isRequired,
    header: string.isRequired,
    body: string.isRequired,
    img: string.isRequired,
    getRef: func.isRequired,
};

export default Labs;
