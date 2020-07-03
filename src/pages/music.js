import React, { useEffect } from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";

const MusicPage = () => {
  // The debounce function receives our function as a parameter
  const debounce = fn => {
    // This holds the requestAnimationFrame reference, so we can cancel it if we wish
    let frame;

    // The debounce function returns a new function that can receive a variable number of arguments
    return (...params) => {
      // If the frame variable has been defined, clear it now, and queue for next frame
      if (frame) {
        cancelAnimationFrame(frame);
      }

      // Queue our function call for the next frame
      frame = requestAnimationFrame(() => {
        // Call our function and pass any params we received
        fn(...params);
      });
    };
  };

  const storeScroll = () => {
    // console.log(window);
    // console.log(
    //   "WHAT IS IT: " + (window.innerHeight + window.scrollY) + ", height: " + document.documentElement.offsetHeight
    // );
    document.documentElement.dataset.scroll = window.scrollY;
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      document.documentElement.dataset.scroll = 1;
      console.log("Hit");
    } else {
      document.documentElement.dataset.scroll = 0;
      console.log("Nay");
    }
  };

  useEffect(() => {
    // Listen for new scroll events, here we debounce our `storeScroll` function
    document.addEventListener("scroll", debounce(storeScroll), { passive: true });

    // Update scroll position for first time
    storeScroll();
  }, []);

  return (
    <Layout pageInfo={{ pageName: "music" }}>
      <SEO title="Music" />
      <div className="paragraphContent">
        <h1>Music</h1>
        <p>
          Lorizzle crazy away sit amizzle, break yo neck, yall adipiscing funky fresh. Nullizzle doggy velizzle, i'm in
          the shizzle gizzle, suscipit i'm in the shizzle, gravida pizzle, arcu. Pellentesque shizzle my nizzle
          crocodizzle tortizzle. Sizzle erizzle. Fusce shizzlin dizzle dolor dapibizzle turpis tempizzle fo shizzle my
          nizzle. Mauris pellentesque nibh et yo mamma. Gizzle shiz mofo. Bling bling fizzle bow wow wow things. In
          crazy habitasse fizzle dictumst. Donec dapibizzle. Curabitur tellus hizzle, fo shizzle my nizzle shiz,
          mattizzle izzle, eleifend bling bling, nunc. Check it out suscipizzle. Gangsta semper velit sed pizzle. I'm in
          the shizzle izzle dizzle quis black dope mollizzle. Shut the shizzle up potenti. Nizzle odio. Shut the shizzle
          up neque. Fizzle orci. Cras mauris mauris, shizzle my nizzle crocodizzle a, ghetto sit dope, malesuada izzle,
          pede. Pellentesque gravida. Vestibulizzle mammasay mammasa mamma oo sa mi, volutpizzle in, sagittizzle sizzle,
          adipiscing sempizzle, velit. Cras fo shizzle ipsizzle. Sure volutpizzle mah nizzle vel fo shizzle. Cras quis
          justo in purus sodalizzle ornare. Dang venenatizzle justo my shizz you son of a bizzle. Nunc shit. Suspendisse
          venenatizzle the bizzle bow wow wow. Curabitur nizzle ante. Nunc pharetra, brizzle eu shiz hendrerizzle,
          ipsizzle felizzle elementizzle sem, da bomb aliquizzle fo shizzle break yo neck, yall luctizzle pede. the
          bizzle nisl. Shizznit hizzle taciti sociosqu izzle litora own yo' pimpin' conubia break it down, pizzle
          inceptos hymenizzle. Aliquam interdizzle, nizzle nec pizzle bizzle, nisl orci fo shizzle mah nizzle fo rizzle,
          mah home g-dizzle leo, stuff sempizzle check out this boom shackalack fo sizzle. In sagittizzle leo non yo
          mamma. Pellentesque rhoncus, arcu i'm in the shizzle malesuada break it down, sizzle nulla aliquet sem, non
          ass nulla its fo rizzle a shit. Suspendisse volutpat scelerisque augue. Gangster boom shackalack lectus that's
          the shizzle libero. Proin consectetizzle yippiyo sapizzle. Dope shit, diam sit amet i saw beyonces tizzles and
          my pizzle went crizzle own yo', away stuff ultricizzle crackalackin, shit we gonna chung erizzle away sizzle
          that's the shizzle purizzle. Shit hendrerit tortor crunk enim. Phasellizzle boofron. Nulla lectizzle lacus,
          shizznit nec, sit amizzle, check it out egestas, augue. Fo shizzle convallis. ante ipsizzle primizzle in
          faucibizzle orci luctizzle izzle ultricizzle daahng dawg owned Curae; Crackalackin gangsta elizzle i saw
          beyonces tizzles and my pizzle went crizzle cool bibendizzle fo shizzle mah nizzle fo rizzle, mah home
          g-dizzle. Fusce est phat, vulputate vel, semper vel, commodo yo, nisi. Etiam away, tortor egizzle hizzle fo
          shizzle my nizzle, uhuh ... yih! shiz ultrices lorizzle, shit viverra mi urna vitae erizzle. Break it down ass
          dolizzle. Shizznit fo shizzle ligula, mammasay mammasa mamma oo sa sizzle shizzlin dizzle, pot eget,
          sollicitudizzle dawg, tortizzle. Shizzle my nizzle crocodizzle crunk nisi. Sizzle fo shizzle neque cool risus.
          Suspendisse erat. Cras funky fresh tristique turpizzle. Away blandizzle yo mamma purizzle. Sizzle dolizzle
          libero, pharetra funky fresh, posuere ut, dapibus break it down, augue. Suspendisse izzle tellizzle. Own yo'
          mammasay mammasa mamma oo sa lectizzle the bizzle amizzle dope. Fusce dapibus felizzle own yo' for sure.
          Lorizzle ipsum dolor da bomb bow wow wow, consectetizzle yo shiznit. Suspendisse massa its fo rizzle, eleifend
          go to hizzle, ullamcorper izzle, consequat sure, fizzle. Nam dang rutrum nunc. Bling bling owned pede for sure
          yo mamma. Cum break it down natoque doggy et magnis dizzle shizznit montizzle, nascetizzle ridiculizzle
          mizzle. Bizzle go to hizzle we gonna chung, molestie quizzle, own yo' izzle, shizzle my nizzle crocodizzle
          eget, urna. Break it down viverra urna for sure libero. We gonna chung its fo rizzle. Boofron augue ghetto,
          fringilla ass, fizzle a, condimentizzle rizzle, ipsizzle. We gonna chung imperdizzle, nulla sizzle gangsta
          commodo shut the shizzle up, dui mammasay mammasa mamma oo sa i'm in the shizzle black, a hendrerit nunc check
          it out scelerisque velit. Pellentesque dang odio. Da bomb nonummy dolor nizzle metizzle. Nulla fo shizzle.
          Nulla sizzle ligula. Ghetto porta pizzle tellus. Sure viverra, fo shizzle the bizzle vulputate yippiyo, libero
          urna fo shizzle my nizzle shut the shizzle up, non condimentum bizzle fo shizzle its fo rizzle nunc. Donizzle
          da bomb dolor. Vestibulizzle sure uhuh ... yih!. Sed elementizzle funky fresh erizzle. Shiz hizzle sem, owned
          id, volutpizzle egizzle, dawg da bomb, nunc. Sed pharetra. Break yo neck, yall gangster. Funky fresh sizzle
          daahng dawg leo nec ante blandizzle dignissizzle. Shit break yo neck, yall tellus sizzle boom shackalack bow
          wow wow. Pimpin' tempizzle fo shizzle felis.
        </p>

        <p>
          Lorizzle crazy away sit amizzle, break yo neck, yall adipiscing funky fresh. Nullizzle doggy velizzle, i'm in
          the shizzle gizzle, suscipit i'm in the shizzle, gravida pizzle, arcu. Pellentesque shizzle my nizzle
          crocodizzle tortizzle. Sizzle erizzle. Fusce shizzlin dizzle dolor dapibizzle turpis tempizzle fo shizzle my
          nizzle. Mauris pellentesque nibh et yo mamma. Gizzle shiz mofo. Bling bling fizzle bow wow wow things. In
          crazy habitasse fizzle dictumst. Donec dapibizzle. Curabitur tellus hizzle, fo shizzle my nizzle shiz,
          mattizzle izzle, eleifend bling bling, nunc. Check it out suscipizzle. Gangsta semper velit sed pizzle. I'm in
          the shizzle izzle dizzle quis black dope mollizzle. Shut the shizzle up potenti. Nizzle odio. Shut the shizzle
          up neque. Fizzle orci. Cras mauris mauris, shizzle my nizzle crocodizzle a, ghetto sit dope, malesuada izzle,
          pede. Pellentesque gravida. Vestibulizzle mammasay mammasa mamma oo sa mi, volutpizzle in, sagittizzle sizzle,
          adipiscing sempizzle, velit. Cras fo shizzle ipsizzle. Sure volutpizzle mah nizzle vel fo shizzle. Cras quis
          justo in purus sodalizzle ornare. Dang venenatizzle justo my shizz you son of a bizzle. Nunc shit. Suspendisse
          venenatizzle the bizzle bow wow wow. Curabitur nizzle ante. Nunc pharetra, brizzle eu shiz hendrerizzle,
          ipsizzle felizzle elementizzle sem, da bomb aliquizzle fo shizzle break yo neck, yall luctizzle pede. the
          bizzle nisl. Shizznit hizzle taciti sociosqu izzle litora own yo' pimpin' conubia break it down, pizzle
          inceptos hymenizzle. Aliquam interdizzle, nizzle nec pizzle bizzle, nisl orci fo shizzle mah nizzle fo rizzle,
          mah home g-dizzle leo, stuff sempizzle check out this boom shackalack fo sizzle. In sagittizzle leo non yo
          mamma. Pellentesque rhoncus, arcu i'm in the shizzle malesuada break it down, sizzle nulla aliquet sem, non
          ass nulla its fo rizzle a shit. Suspendisse volutpat scelerisque augue. Gangster boom shackalack lectus that's
          the shizzle libero. Proin consectetizzle yippiyo sapizzle. Dope shit, diam sit amet i saw beyonces tizzles and
          my pizzle went crizzle own yo', away stuff ultricizzle crackalackin, shit we gonna chung erizzle away sizzle
          that's the shizzle purizzle. Shit hendrerit tortor crunk enim. Phasellizzle boofron. Nulla lectizzle lacus,
          shizznit nec, sit amizzle, check it out egestas, augue. Fo shizzle convallis. ante ipsizzle primizzle in
          faucibizzle orci luctizzle izzle ultricizzle daahng dawg owned Curae; Crackalackin gangsta elizzle i saw
          beyonces tizzles and my pizzle went crizzle cool bibendizzle fo shizzle mah nizzle fo rizzle, mah home
          g-dizzle. Fusce est phat, vulputate vel, semper vel, commodo yo, nisi. Etiam away, tortor egizzle hizzle fo
          shizzle my nizzle, uhuh ... yih! shiz ultrices lorizzle, shit viverra mi urna vitae erizzle. Break it down ass
          dolizzle. Shizznit fo shizzle ligula, mammasay mammasa mamma oo sa sizzle shizzlin dizzle, pot eget,
          sollicitudizzle dawg, tortizzle. Shizzle my nizzle crocodizzle crunk nisi. Sizzle fo shizzle neque cool risus.
          Suspendisse erat. Cras funky fresh tristique turpizzle. Away blandizzle yo mamma purizzle. Sizzle dolizzle
          libero, pharetra funky fresh, posuere ut, dapibus break it down, augue. Suspendisse izzle tellizzle. Own yo'
          mammasay mammasa mamma oo sa lectizzle the bizzle amizzle dope. Fusce dapibus felizzle own yo' for sure.
          Lorizzle ipsum dolor da bomb bow wow wow, consectetizzle yo shiznit. Suspendisse massa its fo rizzle, eleifend
          go to hizzle, ullamcorper izzle, consequat sure, fizzle. Nam dang rutrum nunc. Bling bling owned pede for sure
          yo mamma. Cum break it down natoque doggy et magnis dizzle shizznit montizzle, nascetizzle ridiculizzle
          mizzle. Bizzle go to hizzle we gonna chung, molestie quizzle, own yo' izzle, shizzle my nizzle crocodizzle
          eget, urna. Break it down viverra urna for sure libero. We gonna chung its fo rizzle. Boofron augue ghetto,
          fringilla ass, fizzle a, condimentizzle rizzle, ipsizzle. We gonna chung imperdizzle, nulla sizzle gangsta
          commodo shut the shizzle up, dui mammasay mammasa mamma oo sa i'm in the shizzle black, a hendrerit nunc check
          it out scelerisque velit. Pellentesque dang odio. Da bomb nonummy dolor nizzle metizzle. Nulla fo shizzle.
          Nulla sizzle ligula. Ghetto porta pizzle tellus. Sure viverra, fo shizzle the bizzle vulputate yippiyo, libero
          urna fo shizzle my nizzle shut the shizzle up, non condimentum bizzle fo shizzle its fo rizzle nunc. Donizzle
          da bomb dolor. Vestibulizzle sure uhuh ... yih!. Sed elementizzle funky fresh erizzle. Shiz hizzle sem, owned
          id, volutpizzle egizzle, dawg da bomb, nunc. Sed pharetra. Break yo neck, yall gangster. Funky fresh sizzle
          daahng dawg leo nec ante blandizzle dignissizzle. Shit break yo neck, yall tellus sizzle boom shackalack bow
          wow wow. Pimpin' tempizzle fo shizzle felis.
        </p>
      </div>
    </Layout>
  );
};

export default MusicPage;
