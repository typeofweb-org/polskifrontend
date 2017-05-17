import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from './BlogTiles.styl';
import Loader from '../../../components/Indicators/Loader';
import TilesArticles from './TilesArticles';
import Waypoint from 'react-waypoint';
import ReactImageFallback from 'react-image-fallback';
import noImage from '../../../../public/no_image.png';
import ResponsivePanel from '../../../components/Responsive/ResponsivePanel';

const BlogTiles = props => {
  return (
    <ResponsivePanel className={style.container} header="Blogi - Strony - Serwisy" description="">
      <Loader isLoading={props.blogListLoading}>
        {props.children}
        {props.blogList.map((item, index) => {
          return (
            <div className={style['container__wrapper']} key={index}>
              <section className={style['container__blog']}>
                <h2 className={style.title}>
                  <a className={style['title__link']} target="_blank" href={item.href} rel="nofollow">
                    <ReactImageFallback alt={`${item.name} - ikona`}
                                        className={style['title__favicon']}
                                        src={item.favicon}
                                        fallbackImage={noImage}
                                        initialImage={noImage} />
                    {item.name}
                  </a>
                </h2>
                <TilesArticles articles={item.articles || []}
                               blogHref={item.href}
                               blogName={item.name}
                               onArticleClicked={props.onArticleClicked}
                               clickedArticles={props.clickedArticles}
                               favicon={item.favicon}
                />
              </section>
            </div>
          );
        })}
        <div className={style['container__clear']}>
        </div>
      </Loader>
      {props.nextPage !== -1 ? (
        <Loader isLoading={props.isLoadingMore}>
          <Waypoint onEnter={props.onScrolledBottom} scrollableAncestor="window" />
        </Loader>
      ) : null}
    </ResponsivePanel>
  );
};

BlogTiles.propTypes = {
  blogList: PropTypes.array.isRequired,
  blogListLoading: PropTypes.bool.isRequired,
  isLoadingMore: PropTypes.bool.isRequired,
  onScrolledBottom: PropTypes.func.isRequired,
  nextPage: PropTypes.number.isRequired,
  onArticleClicked: PropTypes.func.isRequired,
  clickedArticles: PropTypes.array.isRequired,
};

export default withStyles(style)(BlogTiles);
