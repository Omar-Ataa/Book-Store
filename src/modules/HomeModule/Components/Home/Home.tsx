import BookDealSlider from "../BookDealSlider/BookDealSlider";
import CategoriesSwiper from "../ExploreCate/CategoriesSwiper";
import FeaturedBookSlider from "../FeaturedBookSlider/FeaturedBookSlider";
import Hero from "../Hero/Hero";

import LatestArticles from "../LatestArticles/LatestArticles";
import NewReleaseBooks from "../NewReleaseBooks/NewReleaseBooks";
import NewsletterSection from "../NewsletterSection/NewsletterSection";

export default function Home() {
  return (
    <>
      <Hero/>
      <CategoriesSwiper />
      <NewReleaseBooks />
      <FeaturedBookSlider />
      <BookDealSlider />
      <NewsletterSection />
      <LatestArticles />
    </>
  );
}
