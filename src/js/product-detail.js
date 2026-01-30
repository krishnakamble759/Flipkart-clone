import '../scss/style.scss';
import '../scss/product-detail.scss';
import { addToCart, initCartBadge, getCart } from './cart-manager.js';
import { initSearch } from './search-manager.js';
import { updateAllDeliveryDates } from './date-manager.js';

console.log('Product Detail JS Loaded');

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Cart Badge
    initCartBadge();

    // Initialize Search
    initSearch();

    // Update Delivery Dates
    updateAllDeliveryDates();

    const updateCartButtons = () => {
        const cart = getCart();
        const activeSection = document.querySelector('.product-layout:not(.hidden)');

        // Update section-specific buttons
        document.querySelectorAll('.product-layout').forEach(section => {
            const id = section.id;
            const isInCart = cart.some(item => item.id === id);
            const cartBtns = section.querySelectorAll('.btn-cart, .add-to-cart-mobile, .cart-icon-btn');

            cartBtns.forEach(btn => {
                const isIconBtn = btn.classList.contains('cart-icon-btn');
                if (isInCart) {
                    if (isIconBtn) {
                        btn.innerHTML = '<i class="bi bi-cart-check-fill text-blue"></i>';
                    } else {
                        btn.innerHTML = '<i class="bi bi-cart-fill"></i> GO TO CART';
                    }
                    btn.classList.add('go-to-cart');
                } else {
                    if (isIconBtn) {
                        btn.innerHTML = '<i class="bi bi-cart3"></i>';
                    } else {
                        btn.innerHTML = '<i class="bi bi-cart-fill"></i> ADD TO CART';
                    }
                    btn.classList.remove('go-to-cart');
                }
            });
        });

        // Update global bottom bar buttons based on active product
        if (activeSection) {
            const activeId = activeSection.id;
            const isInCart = cart.some(item => item.id === activeId);
            const globalCartBtns = document.querySelectorAll('#mobile-action-bar .cart-icon-btn, #mobile-action-bar .add-to-cart-mobile');

            globalCartBtns.forEach(btn => {
                const isIconBtn = btn.classList.contains('cart-icon-btn');
                if (isInCart) {
                    if (isIconBtn) {
                        btn.innerHTML = '<i class="bi bi-cart-check-fill text-blue"></i>';
                    } else {
                        btn.innerHTML = '<i class="bi bi-cart-fill"></i> GO TO CART';
                    }
                    btn.classList.add('go-to-cart');
                } else {
                    if (isIconBtn) {
                        btn.innerHTML = '<i class="bi bi-cart3"></i>';
                    } else {
                        btn.innerHTML = 'Add to cart'; // Text as per HTML template for global bar
                    }
                    btn.classList.remove('go-to-cart');
                }
            });
        }
    };

    updateCartButtons();
    window.addEventListener('cartUpdated', updateCartButtons);

    // SECTION SWITCHING LOGIC
    const params = new URLSearchParams(window.location.search);
    const productType = params.get('type') || params.get('product');

    const powerbankSection = document.getElementById('product-powerbank') || document.getElementById('product-mi-powerbank');
    const cameraSection = document.getElementById('product-camera');
    const printerEpsonSection = document.getElementById('product-printer-epson') || document.getElementById('product-epson-l3210');
    const printerHpSection = document.getElementById('product-printer-hp') || document.getElementById('product-hp-2338');
    const shaverSection = document.getElementById('product-shaver') || document.getElementById('product-shaver-s5885');
    const shaverS5885Section = document.getElementById('product-shaver-s5885');
    const monitorAcerSection = document.getElementById('product-monitor-acer');
    const monitorAcerKA222QSection = document.getElementById('product-monitor-acer-ka222q');
    const monitorSamsungS3Section = document.getElementById('product-monitor-samsung-s3');
    const cycleHeroSection = document.getElementById('product-cycle-hero');
    const cycleUrbanTerrainSection = document.getElementById('product-cycle-urban-terrain-galaxy-max-26t');
    const cycleVescoSection = document.getElementById('product-cycle-vesco-drift-24t');
    const cycleEastCoastSection = document.getElementById('product-cycle-east-coast-carnage-24t');
    const cycleEastCoastMultiSection = document.getElementById('product-cycle-east-coast-multispeed-26t');
    const cycleUrbanTerrain27Section = document.getElementById('product-cycle-urban-terrain-galaxy-27t');
    const cycleLeaderSection = document.getElementById('product-cycle-leader-beast-24t');
    const cycleUrbanTerrainUltraSection = document.getElementById('product-cycle-urban-terrain-galaxy-ultra-27t');
    const cycleUrbanTerrain6000Section = document.getElementById('product-cycle-urban-terrain-ut6000a29');
    const cycleVividSection = document.getElementById('product-cycle-vivid-valero-26t');
    const cycleCapentSection = document.getElementById('product-cycle-capent-infinity-26t');
    const microphoneSection = document.getElementById('product-microphone');
    const microphoneVishwkarmaSection = document.getElementById('product-microphone-vishwkarma');
    const microphoneMakYoutuberSection = document.getElementById('product-microphone-mak-youtuber');
    const microphoneBassBlingK8Section = document.getElementById('product-microphone-bass-bling-k8');
    const microphoneDigitekSection = document.getElementById('product-microphone-digitek');
    const microphoneLabeebSection = document.getElementById('product-microphone-labeeb');
    const microphoneMakWirelessSection = document.getElementById('product-microphone-mak-wireless');
    const microphoneBorneoSection = document.getElementById('product-microphone-borneo');
    const stationarySection = document.getElementById('product-stationery');
    const stationaryRasperSection = document.getElementById('product-stationary-rasper');
    const stationaryRasperOfficeSection = document.getElementById('product-stationary-rasper-office');
    const stationaryHighlighterSection = document.getElementById('product-stationary-highlighter');
    const stationaryGraceoSection = document.getElementById('product-stationary-graceo');
    const stationaryFlipxenSection = document.getElementById('product-stationary-flipxen');
    const stationarySamwaxSection = document.getElementById('product-stationary-samwax');
    const stationaryFrikSection = document.getElementById('product-stationary-frik');
    const stationaryTapeSection = document.getElementById('product-stationary-tape');
    const headphonesSection = document.getElementById('product-headphones');
    const headphonesBoat425Section = document.getElementById('product-headphones-boat-425');
    const headphonesBoat430Section = document.getElementById('product-headphones-boat-430');
    const headphonesNoiseMax4Section = document.getElementById('product-headphones-noise-airwave-max-4');
    const headphonesBullstormUltrapoodSection = document.getElementById('product-headphones-bullstorm-ultrapood');
    const headphonesTwsFoldableSection = document.getElementById('product-headphones-tws-foldable');
    const headphonesFFeronsSection = document.getElementById('product-headphones-f-ferons');
    const headphonesZebronicsThunderSection = document.getElementById('product-headphones-zebronics-thunder');
    const helmetTvsAntiMatterSection = document.getElementById('product-helmet-tvs-anti-matter');
    const helmetTvsMissfitSection = document.getElementById('product-helmet-tvs-missfit');
    const helmetUrbanCarrierAbsGhostRiderSection = document.getElementById('product-helmet-urban-carrier-abs-ghost-rider');
    const helmetPlayersRacingRiderSection = document.getElementById('product-helmet-players-racing-rider');
    const helmetOthFlipUpSection = document.getElementById('product-helmet-oth-flip-up');
    const tyreVsrTractorSection = document.getElementById('product-tyre-vsr-tractor');
    const tyreVsrSupremeSection = document.getElementById('product-tyre-vsr-supreme');
    const tyreCeatMilazeSection = document.getElementById('product-tyre-ceat-milaze');
    const tyreCeatFuelsmarrtSection = document.getElementById('product-tyre-ceat-fuelsmarrt');
    const tyreCeatSecuradriveSection = document.getElementById('product-tyre-ceat-securadrive');
    const tyreCeatMilaze12Section = document.getElementById('product-tyre-ceat-milaze-12');
    const tyreMrfNylogripSection = document.getElementById('product-tyre-mrf-nylogrip');
    const tyreJkBlazeSection = document.getElementById('product-tyre-jk-blaze');
    const capGoodThingsSection = document.getElementById('product-cap-good-things');
    console.log('Debug: capGoodThingsSection found:', !!capGoodThingsSection);

    const capDkeraodSection = document.getElementById('product-cap-dkeraod');
    const capMJohnSection = document.getElementById('product-cap-m-john');
    const capZendroSection = document.getElementById('product-cap-zendro');
    const helmetSection = document.getElementById('product-helmet');
    const tyreSection = document.getElementById('product-tyre');
    const miPowerbankSection = document.getElementById('product-mi-powerbank');
    const mi20000PowerbankSection = document.getElementById('product-mi-20000-powerbank');
    const mi33wPowerbankSection = document.getElementById('product-mi-33w-powerbank');
    const mi18wPowerbankSection = document.getElementById('product-mi-18w-powerbank');
    const samsung45wPowerbankSection = document.getElementById('product-samsung-45w-powerbank');
    const samsungWirelessPowerbankSection = document.getElementById('product-samsung-wireless-powerbank');
    const ambrane20wPowerbankSection = document.getElementById('product-ambrane-20w-powerbank');
    const canonR100Section = document.getElementById('product-canon-r100');
    const canonR50Section = document.getElementById('product-canon-r50');
    const canon1500dSection = document.getElementById('product-canon-1500d');
    const sonyAlpha6600Section = document.getElementById('product-sony-alpha-6600');
    const fujifilmInstaxMini11Section = document.getElementById('product-fujifilm-instax-mini-11');
    const epsonL130Section = document.getElementById('product-epson-l130');
    const epsonL3200Section = document.getElementById('product-epson-l3200');
    const epsonL3251Section = document.getElementById('product-epson-l3251');
    const epsonL3250Section = document.getElementById('product-epson-l3250');
    const epsonL3210Section = document.getElementById('product-epson-l3210');
    const epsonL3266Section = document.getElementById('product-epson-l3266');
    const epsonL4360Section = document.getElementById('product-epson-l4360');
    const epsonL8050Section = document.getElementById('product-epson-l8050');
    const hp2606sdwSection = document.getElementById('product-hp-2606sdw');
    const hp2338Section = document.getElementById('product-hp-2338');
    const hp2820Section = document.getElementById('product-hp-2820');
    const hp529Section = document.getElementById('product-hp-529');
    const hp523Section = document.getElementById('product-hp-523');
    const hp2878Section = document.getElementById('product-hp-2878');
    const hp4278Section = document.getElementById('product-hp-4278');
    const hp589Section = document.getElementById('product-hp-589');
    const hp585Section = document.getElementById('product-hp-585');
    const shaverS1151Section = document.getElementById('product-shaver-s1151');
    const shaverX3063Section = document.getElementById('product-shaver-x3063');
    const shaverS3144Section = document.getElementById('product-shaver-s3144');
    const shaverFD5056Section = document.getElementById('product-shaver-fd5056');
    const shaverFD5000Section = document.getElementById('product-shaver-fd5000');
    const shaverV323Section = document.getElementById('product-shaver-v323');
    const shaverK566Section = document.getElementById('product-shaver-k566');
    const monitorZebronicsSection = document.getElementById('product-monitor-zebronics');
    const monitorZebronics22Section = document.getElementById('product-monitor-zebronics-22');
    const monitorFrontechSection = document.getElementById('product-monitor-frontech');
    const monitorFrontech22Section = document.getElementById('product-monitor-frontech-22');
    const monitorMarq22Section = document.getElementById('product-monitor-marq-22');
    const lightEvereadyCityliteSection = document.getElementById('product-light-eveready-citylite');
    const lightSturliteDoraSection = document.getElementById('product-light-sturlite-dora');
    const lightSturliteDionSection = document.getElementById('product-light-sturlite-dion');
    const lightPhilipsTesniSection = document.getElementById('product-light-philips-tesni');
    const lightEvereadyHl58Section = document.getElementById('product-light-eveready-hl58');
    const lightSturliteDora22wSection = document.getElementById('product-light-sturlite-dora');
    const lightSturlitePtonSection = document.getElementById('product-light-sturlite-pton');
    const lightCinefxSection = document.getElementById('product-light-cinefx');
    const lightParateSection = document.getElementById('product-light-parate');
    const carpetBlushBloomSection = document.getElementById('product-carpet-blush-bloom');
    const carpetHrCarpetSection = document.getElementById('product-carpet-hr-carpet');
    const carpetBhCarpetSection = document.getElementById('product-carpet-bhcarpet');
    const carpetTahnoorSection = document.getElementById('product-carpet-tahnoor');
    const carpetAdibSection = document.getElementById('product-carpet-adib');
    const carpetGalichaSection = document.getElementById('product-carpet-galicha');
    const carpetAvioniSection = document.getElementById('product-carpet-avioni');
    const carpetKaviSection = document.getElementById('product-carpet-kavi');
    const namkeenLaljiNavratanSection = document.getElementById('product-namkeen-lalji-navratan');
    const namkeenSapphireSection = document.getElementById('product-namkeen-sapphire');
    const namkeenBhujiaSection = document.getElementById('product-namkeen-bhujia');
    const namkeenTastearSection = document.getElementById('product-namkeen-tastear');
    const namkeenEnglishNutsSection = document.getElementById('product-namkeen-english-nuts');
    const namkeenFarmleySection = document.getElementById('product-namkeen-farmley');
    const namkeenHealthyTreatSection = document.getElementById('product-namkeen-healthy-treat');
    const namkeenPitaSection = document.getElementById('product-namkeen-pita');
    const orientBulbSection = document.getElementById('product-orient-bulb');
    const orientEternal30wSection = document.getElementById('product-orient-eternal-30w');
    const orientEternal30wPack4Section = document.getElementById('product-orient-eternal-30w-pack-4');
    const halonix12wSection = document.getElementById('product-halonix-12w');
    const halonix50wSection = document.getElementById('product-halonix-50w');
    const henonexBulbSection = document.getElementById('product-henonex-bulb-12w');
    const wiproBulbSection = document.getElementById('product-wipro-bulb-12w');


    const goodriskBedCoverSection = document.getElementById('product-goodrisk-bed-cover');
    const googlyBedCoverSection = document.getElementById('product-googly-bed-cover');
    const decorBedCoverSection = document.getElementById('product-decor-bed-cover');
    const ecruBedSpreadSection = document.getElementById('product-ecru-bed-spread');
    const erbaBedSpreadSection = document.getElementById('product-erba-bed-spread');

    // Bottom Bar Elements
    const bottomBuyBtn = document.getElementById('bottom-buy-btn');
    const bottomEmiPrice = document.getElementById('bottom-emi-price');
    const emiBtn = document.querySelector('.emi-btn');
    const mobileActionBar = document.getElementById('mobile-action-bar');

    const updateBottomBar = (priceStr) => {
        if (!mobileActionBar) return;
        const numericPrice = parseInt(priceStr.replace(/[^0-9]/g, ''));
        if (numericPrice < 7000) {
            mobileActionBar.classList.add('low-price');
        } else {
            mobileActionBar.classList.remove('low-price');
        }
    };

    // Reset all sections to hidden state

    // Helper function to safely hide sections
    const hideSection = (section) => {
        if (section) {
            section.classList.add('hidden');
        }
    };

    [powerbankSection, cameraSection, printerEpsonSection, printerHpSection, shaverSection, shaverS5885Section, shaverS1151Section, shaverX3063Section, shaverS3144Section, shaverFD5056Section, shaverFD5000Section, shaverV323Section, shaverK566Section, monitorAcerSection, monitorAcerKA222QSection, monitorSamsungS3Section, monitorZebronicsSection, monitorZebronics22Section, monitorFrontechSection, monitorFrontech22Section, monitorMarq22Section, cycleHeroSection, cycleUrbanTerrainSection, cycleVescoSection, cycleEastCoastSection, cycleEastCoastMultiSection, cycleUrbanTerrain27Section, cycleLeaderSection, cycleUrbanTerrainUltraSection, cycleUrbanTerrain6000Section, cycleVividSection, cycleCapentSection, microphoneSection, microphoneVishwkarmaSection, microphoneMakYoutuberSection, microphoneBassBlingK8Section, microphoneDigitekSection, microphoneLabeebSection, microphoneMakWirelessSection, microphoneBorneoSection, stationarySection, stationaryRasperSection, stationaryRasperOfficeSection, stationaryHighlighterSection, stationaryGraceoSection, stationaryFlipxenSection, stationarySamwaxSection, stationaryFrikSection, stationaryTapeSection, headphonesSection, headphonesBoat425Section, headphonesBoat430Section, headphonesNoiseMax4Section, headphonesBullstormUltrapoodSection, headphonesTwsFoldableSection, headphonesFFeronsSection, headphonesZebronicsThunderSection, helmetSection, helmetTvsAntiMatterSection, helmetTvsMissfitSection, helmetUrbanCarrierAbsGhostRiderSection, helmetPlayersRacingRiderSection, helmetOthFlipUpSection, tyreVsrTractorSection, tyreVsrSupremeSection, tyreCeatMilazeSection, tyreCeatFuelsmarrtSection, tyreCeatSecuradriveSection, tyreCeatMilaze12Section, tyreMrfNylogripSection, tyreJkBlazeSection, capGoodThingsSection, capDkeraodSection, capMJohnSection, capZendroSection, tyreSection, miPowerbankSection, mi20000PowerbankSection, mi33wPowerbankSection, mi18wPowerbankSection, samsung45wPowerbankSection, samsungWirelessPowerbankSection, canonR100Section, canonR50Section, canon1500dSection, sonyAlpha6600Section, fujifilmInstaxMini11Section, epsonL130Section, epsonL3200Section, epsonL3251Section, epsonL3250Section, epsonL3210Section, epsonL3266Section, epsonL4360Section, epsonL8050Section, hp2606sdwSection, hp2338Section, hp2820Section, hp529Section, hp523Section, hp2878Section, hp4278Section, hp589Section, hp585Section, lightEvereadyCityliteSection, lightSturliteDoraSection, lightSturliteDionSection, lightPhilipsTesniSection, lightEvereadyHl58Section, lightSturliteDora22wSection, lightSturlitePtonSection, lightCinefxSection, lightParateSection, carpetBlushBloomSection, carpetHrCarpetSection, carpetBhCarpetSection, carpetTahnoorSection, carpetAdibSection, carpetGalichaSection, carpetAvioniSection, carpetKaviSection, namkeenLaljiNavratanSection, namkeenSapphireSection, namkeenBhujiaSection, namkeenTastearSection, namkeenEnglishNutsSection, namkeenFarmleySection, namkeenHealthyTreatSection, namkeenPitaSection, goodriskBedCoverSection, googlyBedCoverSection, decorBedCoverSection, ecruBedSpreadSection, erbaBedSpreadSection, ambrane20wPowerbankSection, orientBulbSection, orientEternal30wSection, orientEternal30wPack4Section, halonix12wSection, halonix50wSection, henonexBulbSection, wiproBulbSection].forEach(hideSection);

    if (emiBtn) emiBtn.classList.remove('hide');
    if (bottomBuyBtn) {
        bottomBuyBtn.classList.remove('notify-me');
    }

    const setProductInfo = (price, emi) => {
        if (bottomBuyBtn) bottomBuyBtn.textContent = `Buy at ${price}`;

        if (bottomEmiPrice) {
            if (emi) {
                bottomEmiPrice.textContent = emi;
            } else {
                // Calculate EMI: Price / 6 months
                const numericPrice = parseInt(price.replace(/[^0-9]/g, ''));
                if (!isNaN(numericPrice) && numericPrice > 0) {
                    const emiAmount = Math.round(numericPrice / 6);
                    bottomEmiPrice.textContent = `₹${emiAmount.toLocaleString('en-IN')}/- per month`;
                } else {
                    bottomEmiPrice.textContent = '';
                }
            }
        }
        updateBottomBar(price);
    };

    if (productType === 'camera' && cameraSection) {
        cameraSection.classList.remove('hidden');
        setProductInfo('₹1,96,990', 'From ₹32,831/m');
    } else if (productType === 'powerbank' && miPowerbankSection) {
        miPowerbankSection.classList.remove('hidden');
        setProductInfo('₹1,099', 'From ₹183.16/m');
    } else if ((productType === 'helmet-tvs-anti-matter' || productType === 'helmet-tvs-racing') && helmetTvsAntiMatterSection) {
        helmetTvsAntiMatterSection.classList.remove('hidden');
        setProductInfo('₹1,999', '');
    } else if (productType === 'helmet-tvs-missfit' && helmetTvsMissfitSection) {
        helmetTvsMissfitSection.classList.remove('hidden');
        setProductInfo('₹1,636', '');
    } else if ((productType === 'helmet-urban-carrier-abs-ghost-rider' || productType === 'helmet-urban-carrier-ghost-rider') && helmetUrbanCarrierAbsGhostRiderSection) {
        helmetUrbanCarrierAbsGhostRiderSection.classList.remove('hidden');
        setProductInfo('₹769', '');
    } else if ((productType === 'helmet-players-racing-rider' || productType === 'helmet-players-racing') && helmetPlayersRacingRiderSection) {
        helmetPlayersRacingRiderSection.classList.remove('hidden');
        setProductInfo('₹476', '');
    } else if ((productType === 'helmet-oth-flip-up' || productType === 'helmet-oth') && helmetOthFlipUpSection) {
        helmetOthFlipUpSection.classList.remove('hidden');
        setProductInfo('₹814', '');
    } else if (productType === 'tyre-vsr-tractor' && tyreVsrTractorSection) {
        tyreVsrTractorSection.classList.remove('hidden');
        setProductInfo('₹9,184', '');
    } else if (productType === 'tyre-vsr-supreme' && tyreVsrSupremeSection) {
        tyreVsrSupremeSection.classList.remove('hidden');
        setProductInfo('₹12,677', '');
    } else if (productType === 'tyre-ceat-milaze' && tyreCeatMilazeSection) {
        tyreCeatMilazeSection.classList.remove('hidden');
        setProductInfo('₹1,220', '');
    } else if (productType === 'tyre-ceat-fuelsmarrt' && tyreCeatFuelsmarrtSection) {
        tyreCeatFuelsmarrtSection.classList.remove('hidden');
        setProductInfo('₹2,998', '');
    } else if (productType === 'tyre-ceat-securadrive' && tyreCeatSecuradriveSection) {
        tyreCeatSecuradriveSection.classList.remove('hidden');
        setProductInfo('₹4,999', '');
    } else if (productType === 'tyre-ceat-milaze-12' && tyreCeatMilaze12Section) {
        tyreCeatMilaze12Section.classList.remove('hidden');
        setProductInfo('₹1,543', '');
    } else if (productType === 'tyre-mrf-nylogrip' && tyreMrfNylogripSection) {
        tyreMrfNylogripSection.classList.remove('hidden');
        setProductInfo('₹1,199', '');
    } else if (productType === 'tyre-jk-blaze' && tyreJkBlazeSection) {
        tyreJkBlazeSection.classList.remove('hidden');
        setProductInfo('₹1,158', '');
    } else if (productType === 'cap-good-things' && capGoodThingsSection) {
        capGoodThingsSection.classList.remove('hidden');
        setProductInfo('₹204', '');
    } else if (productType === 'cap-dkeraod' && capDkeraodSection) {
        capDkeraodSection.classList.remove('hidden');
        setProductInfo('₹243', '');
    } else if (productType === 'cap-m-john' && capMJohnSection) {
        capMJohnSection.classList.remove('hidden');
        setProductInfo('₹246', '');
    } else if (productType === 'cap-zendro' && capZendroSection) {
        console.log('DEBUG: Showing zendro product');
        console.log('DEBUG: capZendroSection element:', capZendroSection);
        capZendroSection.classList.remove('hidden');
        console.log('DEBUG: Hidden class removed, classList:', capZendroSection.classList);
        setProductInfo('₹281', '');
    } else if (productType === 'printer-epson' && printerEpsonSection) {
        printerEpsonSection.classList.remove('hidden');
        setProductInfo('₹10,999', 'From ₹1,833/m');
    } else if (productType === 'printer-hp' && printerHpSection) {
        printerHpSection.classList.remove('hidden');
        setProductInfo('₹4,299', 'From ₹152/m');
    } else if (productType === 'shaver' && shaverSection) {
        shaverSection.classList.remove('hidden');
        setProductInfo('₹2,217', 'From ₹369/m');
    } else if (productType === 'shaver-s1151' && shaverS1151Section) {
        shaverS1151Section.classList.remove('hidden');
        setProductInfo('₹2,198', 'From ₹366/m');
    } else if (productType === 'shaver-s5885' && shaverS5885Section) {
        shaverS5885Section.classList.remove('hidden');
        setProductInfo('₹7,824', 'From ₹1,304/m');
    } else if (productType === 'shaver-x3063' && shaverX3063Section) {
        shaverX3063Section.classList.remove('hidden');
        setProductInfo('₹3,360', 'From ₹560/m');
    } else if (productType === 'shaver-s3144' && shaverS3144Section) {
        shaverS3144Section.classList.remove('hidden');
        setProductInfo('₹4,543', 'From ₹757/m');
    } else if (productType === 'shaver-fd5056' && shaverFD5056Section) {
        shaverFD5056Section.classList.remove('hidden');
        setProductInfo('₹1,479', 'From ₹247/m');
    } else if (productType === 'shaver-fd5000' && shaverFD5000Section) {
        shaverFD5000Section.classList.remove('hidden');
        setProductInfo('₹1,025', 'From ₹171/m');
    } else if (productType === 'shaver-v323' && shaverV323Section) {
        shaverV323Section.classList.remove('hidden');
        setProductInfo('₹2,199', 'From ₹367/m');
    } else if (productType === 'shaver-k566' && shaverK566Section) {
        shaverK566Section.classList.remove('hidden');
        setProductInfo('₹445', '');
    } else if (productType === 'monitor-acer' && monitorAcerSection) {
        monitorAcerSection.classList.remove('hidden');
        setProductInfo('₹5,399', 'From ₹190/m');
    } else if (productType === 'monitor-acer-ka222q' && monitorAcerKA222QSection) {
        monitorAcerKA222QSection.classList.remove('hidden');
        setProductInfo('₹5,595', 'From ₹197/m');
    } else if (productType === 'monitor-samsung-s3' && monitorSamsungS3Section) {
        monitorSamsungS3Section.classList.remove('hidden');
        setProductInfo('₹7,098', 'From ₹250/m');
    } else if (productType === 'monitor-zebronics' && monitorZebronicsSection) {
        monitorZebronicsSection.classList.remove('hidden');
        setProductInfo('₹2,498', 'From ₹120/m');
    } else if (productType === 'monitor-zebronics-22' && monitorZebronics22Section) {
        monitorZebronics22Section.classList.remove('hidden');
        setProductInfo('₹3,499', 'From ₹167/m');
    } else if (productType === 'monitor-frontech' && monitorFrontechSection) {
        monitorFrontechSection.classList.remove('hidden');
        setProductInfo('₹2,873', 'From ₹102/m');
    } else if (productType === 'monitor-frontech-22' && monitorFrontech22Section) {
        monitorFrontech22Section.classList.remove('hidden');
        setProductInfo('₹3,499', 'From ₹124/m');
    } else if (productType === 'monitor-marq-22' && monitorMarq22Section) {
        monitorMarq22Section.classList.remove('hidden');
        setProductInfo('₹4,999', 'From ₹176/m');
    } else if (productType === 'light-eveready-citylite' && lightEvereadyCityliteSection) {
        lightEvereadyCityliteSection.classList.remove('hidden');
        setProductInfo('₹299', '');
    } else if (productType === 'light-sturlite-dora' && lightSturliteDoraSection) {
        lightSturliteDoraSection.classList.remove('hidden');
        setProductInfo('₹739', '');
    } else if (productType === 'light-sturlite-dion' && lightSturliteDionSection) {
        lightSturliteDionSection.classList.remove('hidden');
        setProductInfo('₹939', '');
    } else if (productType === 'light-philips-tesni' && lightPhilipsTesniSection) {
        lightPhilipsTesniSection.classList.remove('hidden');
        setProductInfo('₹686', '');
    } else if (productType === 'light-eveready-hl58' && lightEvereadyHl58Section) {
        lightEvereadyHl58Section.classList.remove('hidden');
        setProductInfo('₹589', '');
    } else if (productType === 'light-sturlite-dora-22w' && lightSturliteDora22wSection) {
        lightSturliteDora22wSection.classList.remove('hidden');
        setProductInfo('₹739', '');
    } else if (productType === 'light-sturlite-pton' && lightSturlitePtonSection) {
        lightSturlitePtonSection.classList.remove('hidden');
        setProductInfo('₹898', '');
    } else if (productType === 'light-cinefx' && lightCinefxSection) {
        lightCinefxSection.classList.remove('hidden');
        setProductInfo('₹385', '');
    } else if (productType === 'light-parate' && lightParateSection) {
        lightParateSection.classList.remove('hidden');
        setProductInfo('₹716', '');
    } else if (productType === 'carpet-blush-bloom' && carpetBlushBloomSection) {
        carpetBlushBloomSection.classList.remove('hidden');
        setProductInfo('₹464', '');
    } else if (productType === 'carpet-hr-carpet' && carpetHrCarpetSection) {
        carpetHrCarpetSection.classList.remove('hidden');
        setProductInfo('₹974', '');
    } else if (productType === 'carpet-bhcarpet' && carpetBhCarpetSection) {
        carpetBhCarpetSection.classList.remove('hidden');
        setProductInfo('₹994', '');
    } else if (productType === 'carpet-tahnoor' && carpetTahnoorSection) {
        console.log('Showing Tahnoor Carpet');
        carpetTahnoorSection.classList.remove('hidden');
        setProductInfo('₹607', '');
    } else if (productType === 'carpet-adib' && carpetAdibSection) {
        carpetAdibSection.classList.remove('hidden');
        setProductInfo('₹20,103', '');
    } else if (productType === 'carpet-galicha' && carpetGalichaSection) {
        carpetGalichaSection.classList.remove('hidden');
        setProductInfo('₹19,999', 'From ₹704/m');
    } else if (productType === 'carpet-avioni' && carpetAvioniSection) {
        carpetAvioniSection.classList.remove('hidden');
        setProductInfo('₹19,749', '');
    } else if (productType === 'carpet-kavi' && carpetKaviSection) {
        carpetKaviSection.classList.remove('hidden');
        setProductInfo('₹19,749', '');
    } else if (productType === 'namkeen-lalji' && namkeenLaljiNavratanSection) {
        namkeenLaljiNavratanSection.classList.remove('hidden');
        setProductInfo('₹155', '');
    } else if (productType === 'namkeen-sapphire' && namkeenSapphireSection) {
        namkeenSapphireSection.classList.remove('hidden');
        setProductInfo('₹170', '');
    } else if (productType === 'namkeen-bhujia' && namkeenBhujiaSection) {
        namkeenBhujiaSection.classList.remove('hidden');
        setProductInfo('₹300', '');
    } else if (productType === 'cycle-hero' && cycleHeroSection) {
        cycleHeroSection.classList.remove('hidden');
        setProductInfo('₹10,251', 'From ₹1,709/m');
    } else if ((productType === 'cycle-urban-terrain-galaxy-max-26t' || productType === 'cycle-urban-terrain-galaxy-26t-max') && cycleUrbanTerrainSection) {
        cycleUrbanTerrainSection.classList.remove('hidden');
        setProductInfo('₹6,189', '');
    } else if (productType === 'cycle-vesco-drift-24t' && cycleVescoSection) {
        cycleVescoSection.classList.remove('hidden');
        setProductInfo('₹5,668', '');
    } else if (productType === 'cycle-east-coast-carnage-24t' && cycleEastCoastSection) {
        cycleEastCoastSection.classList.remove('hidden');
        setProductInfo('₹5,772', '');
    } else if (productType === 'cycle-east-coast-multispeed-26t' && cycleEastCoastMultiSection) {
        cycleEastCoastMultiSection.classList.remove('hidden');
        setProductInfo('₹6,284', '');
    } else if (productType === 'cycle-urban-terrain-galaxy-27t' && cycleUrbanTerrain27Section) {
        cycleUrbanTerrain27Section.classList.remove('hidden');
        setProductInfo('₹7,099', '');
    } else if (productType === 'cycle-leader-beast-24t' && cycleLeaderSection) {
        cycleLeaderSection.classList.remove('hidden');
        setProductInfo('₹6,109', '');
    } else if (productType === 'cycle-urban-terrain-galaxy-ultra-27t' && cycleUrbanTerrainUltraSection) {
        cycleUrbanTerrainUltraSection.classList.remove('hidden');
        setProductInfo('₹7,249', '');
    } else if (productType === 'cycle-urban-terrain-ut6000a29' && cycleUrbanTerrain6000Section) {
        cycleUrbanTerrain6000Section.classList.remove('hidden');
        setProductInfo('₹12,499', '');
    } else if (productType === 'cycle-vivid-valero-26t' && cycleVividSection) {
        cycleVividSection.classList.remove('hidden');
        setProductInfo('₹7,599', '');
    } else if (productType === 'cycle-capent-infinity-26t' && cycleCapentSection) {
        cycleCapentSection.classList.remove('hidden');
        setProductInfo('₹7,978', '');
    } else if (productType === 'microphone' && microphoneSection) {
        microphoneSection.classList.remove('hidden');
        setProductInfo('₹690', '');
    } else if (productType === 'microphone-vishwkarma' && microphoneVishwkarmaSection) {
        microphoneVishwkarmaSection.classList.remove('hidden');
        setProductInfo('₹188', '');
    } else if (productType === 'microphone-mak-youtuber' && microphoneMakYoutuberSection) {
        microphoneMakYoutuberSection.classList.remove('hidden');
        setProductInfo('₹492', '');
    } else if (productType === 'microphone-bass-bling-k8' && microphoneBassBlingK8Section) {
        microphoneBassBlingK8Section.classList.remove('hidden');
        setProductInfo('₹299', '');
    } else if (productType === 'microphone-digitek' && microphoneDigitekSection) {
        microphoneDigitekSection.classList.remove('hidden');
        setProductInfo('₹3,998', '');
    } else if (productType === 'microphone-labeeb' && microphoneLabeebSection) {
        microphoneLabeebSection.classList.remove('hidden');
        setProductInfo('₹189', '');
    } else if (productType === 'microphone-mak-wireless' && microphoneMakWirelessSection) {
        microphoneMakWirelessSection.classList.remove('hidden');
        setProductInfo('₹448', '');
    } else if (productType === 'microphone-borneo' && microphoneBorneoSection) {
        microphoneBorneoSection.classList.remove('hidden');
        setProductInfo('₹290', '');
    } else if (productType === 'stationary-rasper' && stationaryRasperSection) {
        stationaryRasperSection.classList.remove('hidden');
        setProductInfo('₹290', '');
    } else if (productType === 'stationary-rasper-office' && stationaryRasperOfficeSection) {
        stationaryRasperOfficeSection.classList.remove('hidden');
        setProductInfo('₹436', '');
    } else if (productType === 'stationary-highlighter' && stationaryHighlighterSection) {
        stationaryHighlighterSection.classList.remove('hidden');
        setProductInfo('₹150', '');
    } else if (productType === 'stationary-graceo' && stationaryGraceoSection) {
        stationaryGraceoSection.classList.remove('hidden');
        setProductInfo('₹300', '');
    } else if (productType === 'stationary-flipxen' && stationaryFlipxenSection) {
        stationaryFlipxenSection.classList.remove('hidden');
        setProductInfo('₹271', '');
    } else if (productType === 'stationary-samwax' && stationarySamwaxSection) {
        stationarySamwaxSection.classList.remove('hidden');
        setProductInfo('₹134', '');
    } else if (productType === 'stationary-frik' && stationaryFrikSection) {
        stationaryFrikSection.classList.remove('hidden');
        setProductInfo('₹286', '');
    } else if (productType === 'stationary-tape' && stationaryTapeSection) {
        stationaryTapeSection.classList.remove('hidden');
        setProductInfo('₹140', '');
    } else if (productType === 'stationery' && stationarySection) {
        stationarySection.classList.remove('hidden');
        setProductInfo('₹500', '');
    } else if (productType === 'headphones' && headphonesSection) {
        headphonesSection.classList.remove('hidden');
        setProductInfo('₹928', '');
    } else if (productType === 'headphones-boat-425' && headphonesBoat425Section) {
        headphonesBoat425Section.classList.remove('hidden');
        setProductInfo('₹1,299', 'From ₹216/m');
    } else if (productType === 'headphones-boat-430' && headphonesBoat430Section) {
        headphonesBoat430Section.classList.remove('hidden');
        setProductInfo('₹1,099', 'From ₹183/m');
    } else if (productType === 'headphones-noise-airwave-max-4' && headphonesNoiseMax4Section) {
        headphonesNoiseMax4Section.classList.remove('hidden');
        setProductInfo('₹2,499', 'From ₹416/m');
    } else if (productType === 'headphones-bullstorm-ultrapood' && headphonesBullstormUltrapoodSection) {
        headphonesBullstormUltrapoodSection.classList.remove('hidden');
        setProductInfo('₹498', '');
    } else if (productType === 'headphones-tws-foldable' && headphonesTwsFoldableSection) {
        headphonesTwsFoldableSection.classList.remove('hidden');
        setProductInfo('₹478', '');
    } else if (productType === 'headphones-f-ferons' && headphonesFFeronsSection) {
        headphonesFFeronsSection.classList.remove('hidden');
        setProductInfo('₹279', '');
    } else if (productType === 'headphones-zebronics-thunder' && headphonesZebronicsThunderSection) {
        headphonesZebronicsThunderSection.classList.remove('hidden');
        setProductInfo('₹599', '');
    } else if ((productType === 'helmet' || productType === 'riding-helmet') && helmetSection) {
        helmetSection.classList.remove('hidden');
        if (bottomBuyBtn) {
            bottomBuyBtn.textContent = 'NOTIFY ME';
            bottomBuyBtn.classList.add('notify-me');
        }
        if (emiBtn) emiBtn.classList.add('hide');
        if (mobileActionBar) mobileActionBar.classList.add('low-price');
    } else if (productType === 'tyre' && tyreSection) {
        tyreSection.classList.remove('hidden');
        setProductInfo('₹1,499', '');
    } else if (productType === 'mi-powerbank' && miPowerbankSection) {
        miPowerbankSection.classList.remove('hidden');
        setProductInfo('₹1,099', '');
    } else if (productType === 'mi-20000-powerbank' && mi20000PowerbankSection) {
        mi20000PowerbankSection.classList.remove('hidden');
        setProductInfo('₹1,699', '');
    } else if (productType === 'mi-33w-powerbank' && mi33wPowerbankSection) {
        mi33wPowerbankSection.classList.remove('hidden');
        setProductInfo('₹1,799', '');
    } else if (productType === 'mi-18w-powerbank' && mi18wPowerbankSection) {
        mi18wPowerbankSection.classList.remove('hidden');
        setProductInfo('₹1,359', '');
    } else if (productType === 'samsung-45w-powerbank' && samsung45wPowerbankSection) {
        samsung45wPowerbankSection.classList.remove('hidden');
        setProductInfo('₹2,999', '');
    } else if (productType === 'samsung-wireless-powerbank' && samsungWirelessPowerbankSection) {
        samsungWirelessPowerbankSection.classList.remove('hidden');
        setProductInfo('₹2,499', '');
    } else if (productType === 'ambrane-20w-powerbank' && ambrane20wPowerbankSection) {
        ambrane20wPowerbankSection.classList.remove('hidden');
        setProductInfo('₹899', '');
    } else if (productType === 'canon-r100' && canonR100Section) {
        canonR100Section.classList.remove('hidden');
        setProductInfo('₹44,990', 'From ₹7,500/m');
    } else if (productType === 'canon-r50' && canonR50Section) {
        canonR50Section.classList.remove('hidden');
        setProductInfo('₹61,590', 'From ₹10,265/m');
    } else if (productType === 'canon-1500d' && canon1500dSection) {
        canon1500dSection.classList.remove('hidden');
        setProductInfo('₹42,990', 'From ₹7,165/m');
    } else if (productType === 'sony-alpha-6600' && sonyAlpha6600Section) {
        sonyAlpha6600Section.classList.remove('hidden');
        setProductInfo('₹58,990', 'From ₹9,835/m');
    } else if (productType === 'fujifilm-instax-mini-11' && fujifilmInstaxMini11Section) {
        fujifilmInstaxMini11Section.classList.remove('hidden');
        setProductInfo('₹5,999', 'No cost EMI ₹1,000/m');
    } else if (productType === 'epson-l130' && epsonL130Section) {
        epsonL130Section.classList.remove('hidden');
        setProductInfo('₹8,699', 'From ₹306/m');
    } else if (productType === 'epson-l3200' && epsonL3200Section) {
        epsonL3200Section.classList.remove('hidden');
        setProductInfo('₹10,699', 'From ₹377/m');
    } else if (productType === 'epson-l3251' && epsonL3251Section) {
        epsonL3251Section.classList.remove('hidden');
        setProductInfo('₹12,999', 'From ₹458/m');
    } else if (productType === 'epson-l3250' && epsonL3250Section) {
        epsonL3250Section.classList.remove('hidden');
        setProductInfo('₹13,999', 'From ₹493/m');
    } else if (productType === 'epson-l3210' && epsonL3210Section) {
        epsonL3210Section.classList.remove('hidden');
        setProductInfo('₹11,000', 'From ₹387/m');
    } else if (productType === 'epson-l3266' && epsonL3266Section) {
        epsonL3266Section.classList.remove('hidden');
        setProductInfo('₹15,199', 'From ₹535/m');
    } else if (productType === 'epson-l4360' && epsonL4360Section) {
        epsonL4360Section.classList.remove('hidden');
        setProductInfo('₹19,999', 'From ₹704/m');
    } else if (productType === 'epson-l8050' && epsonL8050Section) {
        epsonL8050Section.classList.remove('hidden');
        setProductInfo('₹21,399', 'From ₹753/m');
    } else if (productType === 'hp-2606sdw' && hp2606sdwSection) {
        hp2606sdwSection.classList.remove('hidden');
        setProductInfo('₹20,499', 'From ₹724/m');
    } else if (productType === 'hp-2338' && hp2338Section) {
        hp2338Section.classList.remove('hidden');
        setProductInfo('₹4,599', 'From ₹162/m');
    } else if (productType === 'hp-2820' && hp2820Section) {
        hp2820Section.classList.remove('hidden');
        setProductInfo('₹5,399', 'From ₹190/m');
    } else if (productType === 'hp-529' && hp529Section) {
        hp529Section.classList.remove('hidden');
        setProductInfo('₹9,999', 'From ₹1,667/m');
    } else if (productType === 'hp-523' && hp523Section) {
        hp523Section.classList.remove('hidden');
        setProductInfo('₹9,999', 'From ₹1,667/m');
    } else if (productType === 'hp-2878' && hp2878Section) {
        hp2878Section.classList.remove('hidden');
        setProductInfo('₹5,599', 'From ₹197/m');
    } else if (productType === 'hp-4278' && hp4278Section) {
        hp4278Section.classList.remove('hidden');
        setProductInfo('₹6,999', 'From ₹247/m');
    } else if (productType === 'hp-589' && hp589Section) {
        hp589Section.classList.remove('hidden');
        setProductInfo('₹11,999', 'From ₹2,000/m');
    } else if (productType === 'hp-585' && hp585Section) {
        hp585Section.classList.remove('hidden');
        setProductInfo('₹10,999', 'From ₹1,833/m');
    } else if (productType === 'namkeen-tastear' && namkeenTastearSection) {
        namkeenTastearSection.classList.remove('hidden');
        setProductInfo('₹1,900', '');
    } else if (productType === 'namkeen-english-nuts' && namkeenEnglishNutsSection) {
        namkeenEnglishNutsSection.classList.remove('hidden');
        setProductInfo('₹1,619', '');
    } else if (productType === 'namkeen-farmley' && namkeenFarmleySection) {
        namkeenFarmleySection.classList.remove('hidden');
        setProductInfo('₹1,533', '');
    } else if (productType === 'namkeen-healthy-treat' && namkeenHealthyTreatSection) {
        namkeenHealthyTreatSection.classList.remove('hidden');
        setProductInfo('₹2,119', '');
    } else if (productType === 'namkeen-pita' && namkeenPitaSection) {
        namkeenPitaSection.classList.remove('hidden');
        setProductInfo('₹100', '');
    } else if ((productType === 'orient-bulb' || productType === 'bulb-orient-12w') && orientBulbSection) {
        orientBulbSection.classList.remove('hidden');
        setProductInfo('₹240', '');
    } else if ((productType === 'orient-eternal-30w' || productType === 'bulb-orient-30w') && orientEternal30wSection) {
        orientEternal30wSection.classList.remove('hidden');
        setProductInfo('₹758', '');
    } else if ((productType === 'orient-eternal-30w-pack-4' || productType === 'bulb-orient-eternal-30w-pack-4' || productType === 'bulb-orient-30w-pack4') && orientEternal30wPack4Section) {
        orientEternal30wPack4Section.classList.remove('hidden');
        setProductInfo('₹2,955', '');
    } else if (productType === 'bulb-halonix-12w' && halonix12wSection) {
        halonix12wSection.classList.remove('hidden');
        setProductInfo('₹289', '');
    } else if (productType === 'bulb-henonex-12w' && henonexBulbSection) {
        henonexBulbSection.classList.remove('hidden');
        setProductInfo('₹346', 'From ₹58/m');
    } else if (productType === 'bulb-wipro-12w' && wiproBulbSection) {
        wiproBulbSection.classList.remove('hidden');
        setProductInfo('₹399', '');
    } else if (productType === 'bulb-halonix-50w' && halonix50wSection) {
        halonix50wSection.classList.remove('hidden');
        setProductInfo('₹2,300', '');
    } else if (productType === 'bed-goodrisk' && goodriskBedCoverSection) {
        goodriskBedCoverSection.classList.remove('hidden');
        setProductInfo('₹435', '');
    } else if (productType === 'bed-googly-multi' && googlyBedCoverSection) {
        googlyBedCoverSection.classList.remove('hidden');
        setProductInfo('₹193', '');
    } else if (productType === 'bed-decor' && decorBedCoverSection) {
        decorBedCoverSection.classList.remove('hidden');
        setProductInfo('₹191', '');
    } else if (productType === 'bed-ecru' && ecruBedSpreadSection) {
        ecruBedSpreadSection.classList.remove('hidden');
        setProductInfo('₹18,470', '');
    } else if (productType === 'bed-erba-grey' && erbaBedSpreadSection) {
        erbaBedSpreadSection.classList.remove('hidden');
        setProductInfo('₹18,371', '');
    } else if (powerbankSection) {
        powerbankSection.classList.remove('hidden');
        setProductInfo('₹1,099', 'From ₹183.16/m');
    }

    // GALLERY LOGIC (Scoped per section)
    const galleries = document.querySelectorAll('.product-layout');
    galleries.forEach(layout => {
        const mainImg = layout.querySelector('.main-img');
        const thumbs = layout.querySelectorAll('.thumb-item');
        const colorThumbs = layout.querySelectorAll('.color-thumb');

        const updateMainImg = (imgSrc, targetThumb) => {
            if (mainImg && imgSrc) {
                mainImg.src = imgSrc;
                thumbs.forEach(t => {
                    const tImg = t.querySelector('img');
                    if (tImg && tImg.src === imgSrc) {
                        t.classList.add('active');
                    } else {
                        t.classList.remove('active');
                    }
                });
            }
        };

        thumbs.forEach(thumb => {
            thumb.addEventListener('mouseenter', () => {
                const img = thumb.querySelector('img');
                if (img) updateMainImg(img.src, thumb);
            });
        });

        colorThumbs.forEach(ct => {
            ct.addEventListener('mouseenter', () => {
                const img = ct.querySelector('img');
                if (img) updateMainImg(img.src);
                colorThumbs.forEach(t => t.classList.remove('selected'));
                ct.classList.add('selected');
            });
        });
    });

    // WISHLIST LOGIC
    const wishlistIcons = document.querySelectorAll('.wishlist-icon');
    wishlistIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            icon.classList.toggle('active');
        });
    });

    // SIZE SELECTION LOGIC
    const sizeButtons = document.querySelectorAll('.size-btn');
    sizeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const parent = btn.parentElement;
            parent.querySelectorAll('.size-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
        });
    });

    // Mobile Back Button
    const mobileBackBtn = document.getElementById('mobile-back-btn');
    if (mobileBackBtn) {
        mobileBackBtn.addEventListener('click', () => {
            if (window.history.length > 1) {
                window.history.back();
            } else {
                window.location.href = '/index.html';
            }
        });
    }

    // ACTIVATE BUTTONS LOGIC
    const addToCartBtns = document.querySelectorAll('.btn-cart, .add-to-cart-mobile, .cart-icon-btn, #mobile-cart-icon');
    const buyNowBtns = document.querySelectorAll('.btn-buy, .buy-now-btn, #bottom-buy-btn');

    const showToast = (message) => {
        // Remove existing toast if any
        const existingToast = document.querySelector('.custom-toast');
        if (existingToast) existingToast.remove();

        const toast = document.createElement('div');
        toast.className = 'custom-toast';
        toast.textContent = message;
        document.body.appendChild(toast);

        // Trigger reflow for transition
        toast.offsetHeight;

        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    };

    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();

            if (btn.classList.contains('go-to-cart')) {
                window.location.href = '/cart.html';
                return;
            }

            // Extract product info from the closest product-layout or find the active one
            let layout = btn.closest('.product-layout');
            if (!layout) {
                layout = document.querySelector('.product-layout:not(.hidden)');
            }

            if (layout) {
                const title = layout.querySelector('.product-title')?.textContent.trim() || 'Product';
                const price = layout.querySelector('.current-price, .price')?.textContent.trim() || '0';
                const image = layout.querySelector('.main-img')?.src || '';
                const id = layout.id; // Use section id as product id

                addToCart({
                    id,
                    title,
                    price,
                    image,
                    url: window.location.href
                });

                showToast('Added to Cart successfully!');
            }
        });
    });

    buyNowBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const actionText = btn.textContent.trim().toUpperCase();
            if (actionText === 'NOTIFY ME') {
                showToast('We will notify you when this product is back in stock!');
            } else {
                window.location.href = 'checkout.html';
            }
        });
    });

    // Login Modal Logic (Desktop Modal & Mobile Header Login)
    const loginModalOverlay = document.querySelector('.login-modal-overlay');
    const loginModalTriggerBtns = document.querySelectorAll('.login-btn, .mobile-icon-item.login');
    const loginCloseBtn = document.querySelector('.modal-close-btn');

    if (loginModalOverlay) {
        // Open Modal
        loginModalTriggerBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                loginModalOverlay.classList.add('active');
                document.body.classList.add('no-scroll');
            });
        });

        // Close Modal via Button
        if (loginCloseBtn) {
            loginCloseBtn.addEventListener('click', () => {
                loginModalOverlay.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        }

        // Close Modal via Overlay Click
        loginModalOverlay.addEventListener('click', (e) => {
            if (e.target === loginModalOverlay) {
                loginModalOverlay.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    }

    // Mobile Login Sheet Logic (Mobile Offcanvas Item)
    const mobileLoginSheetOverlay = document.querySelector('.mobile-login-sheet-overlay');
    const mobileSheetTriggerBtns = document.querySelectorAll('.user-info'); // Offcanvas Login & Signup
    const mobileSheetCloseBtn = document.querySelector('.close-sheet-btn');

    if (mobileLoginSheetOverlay) {
        // Open Sheet
        mobileSheetTriggerBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                mobileLoginSheetOverlay.classList.add('active');
                document.body.classList.add('no-scroll');

                // Close the mobile menu drawer if open
                if (mobileMenuDrawer && mobileMenuDrawer.classList.contains('active')) {
                    mobileMenuDrawer.classList.remove('active');
                    if (mobileMenuOverlay) {
                        mobileMenuOverlay.classList.remove('active');
                    }
                }
            });
        });

        // Close Sheet
        if (mobileSheetCloseBtn) {
            mobileSheetCloseBtn.addEventListener('click', () => {
                mobileLoginSheetOverlay.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        }
    }

    // Mobile Sidebar Menu Logic
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileMenuDrawer = document.querySelector('.mobile-menu-drawer');

    if (hamburgerIcon && mobileMenuDrawer && mobileMenuOverlay) {
        hamburgerIcon.addEventListener('click', () => {
            mobileMenuDrawer.classList.add('active');
            mobileMenuOverlay.classList.add('active');
            document.body.classList.add('no-scroll');
        });

        mobileMenuOverlay.addEventListener('click', () => {
            mobileMenuDrawer.classList.remove('active');
            mobileMenuOverlay.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    }
});
