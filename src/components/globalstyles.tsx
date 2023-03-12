import { createGlobalStyle, DefaultTheme } from 'styled-components'
import 'tippy.js/dist/tippy.css'

export const GlobalStyle = createGlobalStyle`
  *,*::before,*::after {
      padding:0;
      margin:0;
      box-sizing:inherit;
  }
 
  html,input , button  { 
    font-family: Inter Tight, sans-serif;
  } 

  
  body { 
      box-sizing: border-box;
      /* @supports ( padding-top: env(safe-area-inset-top) or padding-top:env(safe-area-inset-top) ) {
        padding-top: env(safe-area-inset-top);
        padding-right: env(safe-area-inset-right);
        padding-bottom: env(safe-area-inset-bottom);
        padding-left: env(safe-area-inset-left);
      } */
  }

  /* :root {
    --primary:#1c1c1c;
    --primary_2: #747474;
    --primary_3: #555;
    --primary_high: #cccccc;
    --primary_high_2:#393939;
    --primary_dark: #000000;
    --secondary: #f4f4f4;
    --secondary_light: #efefef;
    --secondary_light_2: #F1F1F1;
    --secondary_dark: ;
    --tertiary: #e8f0fe;
    --white: #ffffff;
  }  */

   :root {
    --colors-amber1: #1f1300;
    --colors-amber2: #271700;
    --colors-amber3: #341c00;
    --colors-amber4: #3f2200;
    --colors-amber5: #4a2900;
    --colors-amber6: #573300;
    --colors-amber7: #693f05;
    --colors-amber8: #824e00;
    --colors-amber9: #ffb224;
    --colors-amber10: #ffcb47;
    --colors-amber11: #f1a10d;
    --colors-amber12: #fef3dd;
    --colors-amberA1: transparent;
    --colors-amberA2: rgba(253, 131, 0, 0.036);
    --colors-amberA3: rgba(254, 115, 0, 0.094);
    --colors-amberA4: rgba(255, 123, 0, 0.143);
    --colors-amberA5: rgba(255, 132, 0, 0.192);
    --colors-amberA6: rgba(255, 149, 0, 0.25);
    --colors-amberA7: rgba(255, 151, 15, 0.331);
    --colors-amberA8: rgba(255, 153, 0, 0.442);
    --colors-amberA9: rgba(255, 182, 37, 0.98);
    --colors-amberA10: rgba(255,206,72,.98);
    --colors-amberA11: rgba(255,171,14,.938);
    --colors-amberA12: rgba(255,248,225,.98);
    --colors-blue1: #0f1720;
    --colors-blue2: #0f1b2d;
    --colors-blue3: #10243e;
    --colors-blue4: #102a4c;
    --colors-blue5: #0f3058;
    --colors-blue6:  #0d3868;
    --colors-blue7: #0a4481;
    --colors-blue8: #0954a5;
    --colors-blue9: #0091ff;
    --colors-blue10: #369eff;
    --colors-blue11: #52a9ff;
    --colors-blue12: #eaf6ff;
    --colors-blueA1: transparent;
    --colors-blueA2: rgba(15,90,252,.059);
    --colors-blueA3: rgba(22,119,254,.135);
    --colors-blueA4: rgba(20,118,254,.198);
    --colors-blueA5: rgba(15,123,254,.252);
    --colors-blueA6: rgba(9,124,255,.323);
    --colors-blueA7: rgba(4,125,255,.435);
    --colors-blueA8: rgba(5,126,255,.597);
    --colors-blueA9: rgba(0,149,255,.98);
    --colors-blueA10: rgba(55,161,255,.98);
    --colors-blueA11: rgba(83,172,255,.98);
    --colors-blueA12: rgba(239,251,255,.98);
    --colors-bronze1: #191514;
    --colors-bronze2: #1f1917;
    --colors-bronze3: #2a211f;
    --colors-bronze4: #332824;
    --colors-bronze5: #3b2e29;
    --colors-bronze6: #453530;
    --colors-bronze7: #57433c;
    --colors-bronze8: #74594e;
    --colors-bronze9: #a18072;
    --colors-bronze10: #b08c7d;
    --colors-bronze11: #cba393;
    --colors-bronze12: #f9ede7;
    --colors-bronzeA1: transparent;
    --colors-bronzeA2: hsla(20,88%,74%,.027);
    --colors-bronzeA3: hsla(10,99%,83%,.074);
    --colors-bronzeA4: hsla(18,96%,81%,.114);
    --colors-bronzeA5: hsla(18,99%,82%,.148);
    --colors-bronzeA6: hsla(15,98%,82%,.192);
    --colors-bronzeA7: hsla(16,99%,83%,.27);
    --colors-bronzeA8: hsla(18,99%,83%,.396);
    --colors-bronzeA9: hsla(18,99%,85%,.592);
    --colors-bronzeA10: rgba(255,202,180,.657);
    --colors-bronzeA11: rgba(255,204,184,.774);
    --colors-bronzeA12: rgba(255,243,237,.974);
    --colors-brown1: #1a1513;
    --colors-brown2: #221813;
    --colors-brown3: #2e201a;
    --colors-brown4: #36261e;
    --colors-brown5: #3e2d22;
    --colors-brown6: #493528;
    --colors-brown7: #5c4332;
    --colors-brown8: #775940;
    --colors-brown9: #ad7f58;
    --colors-brown10: #bd8b60;
    --colors-brown11: #dba16e;
    --colors-brown12: #faf0e5;
    --colors-brownA1: transparent;
    --colors-brownA2: rgba(255,105,19,.035);
    --colors-brownA3: rgba(253,145,99,.088);
    --colors-brownA4: hsla(21,98%,71%,.123);
    --colors-brownA5: hsla(25,98%,72%,.158);
    --colors-brownA6: hsla(25,99%,74%,.206);
    --colors-brownA7: hsla(25,99%,75%,.289);
    --colors-brownA8: hsla(28,99%,75%,.407);
    --colors-brownA9: rgba(255,186,126,.642);
    --colors-brownA10:  rgba(255,187,127,.712);
    --colors-brownA11: rgba(255,187,127,.843);
    --colors-brownA12: hsla(32,98%,96%,.979);
    --colors-crimson1: #1d1418;
    --colors-crimson2: #27141c;
    --colors-crimson3: #3c1827;
    --colors-crimson4: #481a2d;
    --colors-crimson5: #541b33;
    --colors-crimson6: #641d3b;
    --colors-crimson7: #801d45;
    --colors-crimson8: #ae1955;
    --colors-crimson9: #e93d82;
    --colors-crimson10: #f04f88;
    --colors-crimson11: #f76190;
    --colors-crimson12: #feecf4;
    --colors-crimsonA1: transparent;
    --colors-crimsonA2: rgba(251,20,113,.045);
    --colors-crimsonA3: rgba(254,49,134,.138);
    --colors-crimsonA4: rgba(254,51,132,.191);
    --colors-crimsonA5: rgba(254,49,134,.244);
    --colors-crimsonA6: rgba(254,49,134,.315);
    --colors-crimsonA7: rgba(254,40,126,.439);
    --colors-crimsonA8: rgba(255,28,119,.642);
    --colors-crimsonA9: rgba(255,65,141,.903);
    --colors-crimsonA10: rgba(255,83,143,.934);
    --colors-crimsonA11: rgba(255,100,149,.965);
    --colors-crimsonA12: rgba(255,240,248,.98);
    --colors-cyan1:  #07191d;
    --colors-cyan2:  #061e24;
    --colors-cyan3:  #072830;
    --colors-cyan4:  #07303b;
    --colors-cyan5:  #073844;
    --colors-cyan6:  #064150;
    --colors-cyan7:  #045063;
    --colors-cyan8:  #00647d;
    --colors-cyan9:  #05a2c2;
    --colors-cyan10: #00b1cc;
    --colors-cyan11: #00c2d7;
    --colors-cyan12: #e1f8fa;
    --colors-cyanA1: transparent;
    --colors-cyanA2: rgba(0,187,255,.031);
    --colors-cyanA3: rgba(7,203,252,.085);
    --colors-cyanA4: rgba(7,197,255,.133);
    --colors-cyanA5: rgba(7,205,254,.173);
    --colors-cyanA6: rgba(2,200,255,.226);
    --colors-cyanA7: rgba(0,204,255,.31);
    --colors-cyanA8: rgba(0,200,255,.425);
    --colors-cyanA9: rgba(4,213,255,.731);
    --colors-cyanA10: rgba(0,221,255,.775);
    --colors-cyanA11: rgba(0,229,254,.824);
    --colors-cyanA12: rgba(230,253,255,.978);
    --colors-gold1:  #171613;
    --colors-gold2:  #1c1a15;
    --colors-gold3:  #26231c;
    --colors-gold4:  #2e2a21;
    --colors-gold5:  #353026;
    --colors-gold6:  #3e382c;
    --colors-gold7:  #504737;
    --colors-gold8:  #6b5d48;
    --colors-gold9:  #978365;
    --colors-gold10: #a59071;
    --colors-gold11: #bfa888;
    --colors-gold12: #f7f4e7;
    --colors-goldA1: transparent;
    --colors-goldA2: hsla(40,94%,71%,.022);
    --colors-goldA3: hsla(40,97%,81%,.065);
    --colors-goldA4: hsla(40,96%,81%,.1);
    --colors-goldA5: hsla(38,97%,82%,.13);
    --colors-goldA6: hsla(39,97%,83%,.169);
    --colors-goldA7: hsla(37,99%,82%,.246);
    --colors-goldA8: hsla(35,99%,82%,.363);
    --colors-goldA9: rgba(255,220,167,.552);
    --colors-goldA10: hsla(35,99%,84%,.613);
    --colors-goldA11: hsla(35,99%,85%,.725);
    --colors-goldA12: hsla(49,99%,97%,.966);
    --colors-grass1: #0d1912;
    --colors-grass2: #0f1e13;
    --colors-grass3: #132819;
    --colors-grass4: #16301d;
    --colors-grass5: #193921;
    --colors-grass6: #1d4427;
    --colors-grass7: #245530;
    --colors-grass8: #2f6e3b;
    --colors-grass9: #46a758;
    --colors-grass10: #55b467;
    --colors-grass11: #63c174;
    --colors-grass12: #e5fbeb;
    --colors-grassA1: transparent;
    --colors-grassA2: rgba(104,252,63,.022);
    --colors-grassA3: rgba(104,252,123,.066);
    --colors-grassA4: rgba(103,255,128,.1);
    --colors-grassA5: rgba(99,254,125,.14);
    --colors-grassA6: rgba(99,255,130,.187);
    --colors-grassA7: rgba(101,255,132,.261);
    --colors-grassA8: rgba(105,255,130,.37);
    --colors-grassA9: rgba(105,255,130,.618);
    --colors-grassA10: rgba(120,255,145,.674);
    --colors-grassA11: rgba(131,255,151,.731);
    --colors-grassA12: rgba(234,255,240,.98);
    --colors-gray1:  #161616;
    --colors-gray2:  #1c1c1c;
    --colors-gray3:  #232323;
    --colors-gray4:  #282828;
    --colors-gray5:  #2e2e2e;
    --colors-gray6:  #343434;
    --colors-gray7:  #3e3e3e;
    --colors-gray8:  #505050;
    --colors-gray9:  #707070;
    --colors-gray10: #7e7e7e;
    --colors-gray11: #a0a0a0;
    --colors-gray12: #ededed;
    --colors-grayA1: hsla(0,0%,100%,0);
    --colors-grayA2: hsla(0,0%,100%,.026);
    --colors-grayA3: hsla(0,0%,100%,.056);
    --colors-grayA4: hsla(0,0%,100%,.077);
    --colors-grayA5: hsla(0,0%,100%,.103);
    --colors-grayA6: hsla(0,0%,100%,.129);
    --colors-grayA7: hsla(0,0%,100%,.172);
    --colors-grayA8: hsla(0,0%,100%,.249);
    --colors-grayA9: hsla(0,0%,100%,.386);
    --colors-grayA10: hsla(0,0%,100%,.446);
    --colors-grayA11: hsla(0,0%,100%,.592);
    --colors-grayA12: hsla(0,0%,100%,.923);
    --colors-green1: #0d1912;
    --colors-green2: #0c1f17;
    --colors-green3: #0f291e;
    --colors-green4: #113123;
    --colors-green5: #133929;
    --colors-green6: #164430;
    --colors-green7: #1b543a;
    --colors-green8: #236e4a;
    --colors-green9: #30a46c;
    --colors-green10: #3cb179;
    --colors-green11: #4cc38a;
    --colors-green12: #e5fbeb;
    --colors-greenA1: transparent;
    --colors-greenA2: rgba(0,247,202,.027);
    --colors-greenA3: rgba(42,254,190,.07);
    --colors-greenA4: rgba(51,254,179,.105);
    --colors-greenA5: rgba(56,254,181,.14);
    --colors-greenA6: rgba(61,255,177,.187);
    --colors-greenA7: rgba(67,255,173,.257);
    --colors-greenA8: rgba(73,255,170,.37);
    --colors-greenA9: rgba(71,255,166,.605);
    --colors-greenA10:  rgba(84,255,175,.661);
    --colors-greenA11:  rgba(98,255,179,.74);
    --colors-greenA12:  rgba(234,255,240,.98);
    --colors-indigo1: #131620;
    --colors-indigo2: #15192d;
    --colors-indigo3: #192140;
    --colors-indigo4: #1c274f;
    --colors-indigo5: #1f2c5c;
    --colors-indigo6: #22346e;
    --colors-indigo7: #273e89;
    --colors-indigo8: #2f4eb2;
    --colors-indigo9: #3e63dd;
    --colors-indigo10: #5373e7;
    --colors-indigo11: #849dff;
    --colors-indigo12: #eef1fd;
    --colors-indigoA1: transparent;
    --colors-indigoA2: rgba(53,73,252,.059);
    --colors-indigoA3: rgba(60,99,254,.144);
    --colors-indigoA4: rgba(61,103,255,.211);
    --colors-indigoA5: rgba(63,105,254,.27);
    --colors-indigoA6: rgba(62,107,255,.35);
    --colors-indigoA7: rgba(61,106,255,.471);
    --colors-indigoA8: rgba(62,107,255,.655);
    --colors-indigoA9: rgba(69,113,255,.848);
    --colors-indigoA10: rgba(90,126,255,.893);
    --colors-indigoA11: rgba(134,160,255,.98);
    --colors-indigoA12: rgba(242,245,255,.98);
    --colors-lime1:  #141807;
    --colors-lime2:  #181d08;
    --colors-lime3:  #1e260d;
    --colors-lime4:  #252e0f;
    --colors-lime5:  #2b3711;
    --colors-lime6:  #344213;
    --colors-lime7:  #415215;
    --colors-lime8:  #536716;
    --colors-lime9:  #99d52a;
    --colors-lime10: #c4f042;
    --colors-lime11: #87be22;
    --colors-lime12: #effbdd;
    --colors-limeA1: transparent;
    --colors-limeA2: rgba(202,251,53,.022);
    --colors-limeA3: hsla(88,98%,70%,.061);
    --colors-limeA4: rgba(196,253,91,.096);
    --colors-limeA5: rgba(190,254,81,.135);
    --colors-limeA6: rgba(197,255,73,.182);
    --colors-limeA7: rgba(200,254,63,.252);
    --colors-limeA8: rgba(204,255,51,.342);
    --colors-limeA9: rgba(183,255,50,.819);
    --colors-limeA10: rgba(209,255,70,.936);
    --colors-limeA11: rgba(181,255,44,.719);
    --colors-limeA12: rgba(244,255,225,.98);
    --colors-mauve1: #161618;
    --colors-mauve2: #1c1c1f;
    --colors-mauve3: #232326;
    --colors-mauve4: #28282c;
    --colors-mauve5: #2e2e32;
    --colors-mauve6: #34343a;
    --colors-mauve7: #3e3e44;
    --colors-mauve8: #504f57;
    --colors-mauve9: #706f78;
    --colors-mauve10: #7e7d86;
    --colors-mauve11: #a09fa6;
    --colors-mauve12: #ededef;
    --colors-mauveA1: transparent;
    --colors-mauveA2: rgba(215,215,250,.031);
    --colors-mauveA3: rgba(235,235,254,.061);
    --colors-mauveA4: rgba(229,229,254,.087);
    --colors-mauveA5: rgba(234,234,254,.113);
    --colors-mauveA6: rgba(225,225,254,.148);
    --colors-mauveA7: rgba(232,232,254,.191);
    --colors-mauveA8: rgba(234,231,255,.273);
    --colors-mauveA9: rgba(238,236,255,.416);
    --colors-mauveA10:  rgba(240,238,255,.477);
    --colors-mauveA11:  rgba(247,245,255,.615);
    --colors-mauveA12:  rgba(253,253,255,.931);
    --colors-mint1: #081917;
    --colors-mint2: #05201e;
    --colors-mint3: #052926;
    --colors-mint4: #04312c;
    --colors-mint5: #033a34;
    --colors-mint6: #01453d;
    --colors-mint7: #00564a;
    --colors-mint8: #006d5b;
    --colors-mint9: #70e1c8;
    --colors-mint10: #95f3d9;
    --colors-mint11: #25d0ab;
    --colors-mint12: #e7fcf7;
    --colors-mintA1: transparent;
    --colors-mintA2: rgba(0,251,251,.031);
    --colors-mintA3: rgba(0,253,237,.07);
    --colors-mintA4: rgba(0,253,224,.105);
    --colors-mintA5: rgba(0,254,224,.144);
    --colors-mintA6: rgba(0,254,220,.192);
    --colors-mintA7: rgba(0,254,216,.266);
    --colors-mintA8: rgba(0,254,208,.366);
    --colors-mintA9: rgba(128,255,227,.87);
    --colors-mintA10: rgba(157,255,227,.948);
    --colors-mintA11: rgba(44,255,209,.796);
    --colors-mintA12: rgba(236,255,251,.98);
    --colors-olive1: #151715;
    --colors-olive2: #1a1d19;
    --colors-olive3: #20241f;
    --colors-olive4: #262925;
    --colors-olive5: #2b2f2a;
    --colors-olive6: #313530;
    --colors-olive7: #3b3f3a;
    --colors-olive8: #4c514b;
    --colors-olive9: #687366;
    --colors-olive10: #778175;
    --colors-olive11: #9aa299;
    --colors-olive12: #eceeec;
    --colors-oliveA1: transparent;
    --colors-oliveA2: hsla(91,97%,84%,.026);
    --colors-oliveA3: rgba(214,251,196,.057);
    --colors-oliveA4: hsla(92,92%,94%,.078);
    --colors-oliveA5: rgba(233,254,223,.104);
    --colors-oliveA6: rgba(236,254,229,.13);
    --colors-oliveA7: rgba(241,254,235,.173);
    --colors-oliveA8: rgba(241,255,237,.25);
    --colors-oliveA9: rgba(230,255,225,.397);
    --colors-oliveA10: rgba(235,255,231,.457);
    --colors-oliveA11: rgba(243,255,241,.6);
    --colors-oliveA12: rgba(253,255,253,.927);
    --colors-orange1: #1f1206;
    --colors-orange2: #2b1400;
    --colors-orange3: #391a03;
    --colors-orange4: #441f04;
    --colors-orange5: #4f2305;
    --colors-orange6: #5f2a06;
    --colors-orange7: #763205;
    --colors-orange8: #943e00;
    --colors-orange9: #f76808;
    --colors-orange10: #ff802b;
    --colors-orange11: #ff8b3e;
    --colors-orange12: #feeadd;
    --colors-orangeA1: transparent;
    --colors-orangeA2: rgba(253,55,0,.054);
    --colors-orangeA3: rgba(253,84,0,.117);
    --colors-orangeA4: rgba(254,97,0,.166);
    --colors-orangeA5: rgba(254,98,1,.215);
    --colors-orangeA6: rgba(255,101,6,.286);
    --colors-orangeA7: rgba(255,100,3,.389);
    --colors-orangeA8: rgba(254,102,0,.523);
    --colors-orangeA9: rgba(255,107,8,.965);
    --colors-orangeA10: rgba(255,132,44,.98);
    --colors-orangeA11: rgba(255,140,63,.98);
    --colors-orangeA12: rgba(255,238,225,.98);
    --colors-pink1: #1f121b;
    --colors-pink2: #271421;
    --colors-pink3: #3a182f;
    --colors-pink4: #451a37;
    --colors-pink5: #501b3f;
    --colors-pink6: #601d48;
    --colors-pink7: #7a1d5a;
    --colors-pink8: #a71873;
    --colors-pink9: #d6409f;
    --colors-pink10: #e34ba9;
    --colors-pink11: #f65cb6;
    --colors-pink12: #feebf7;
    --colors-pinkA1: transparent;
    --colors-pinkA2: rgba(253,74,193,.036);
    --colors-pinkA3: rgba(254,68,192,.121);
    --colors-pinkA4: rgba(255,65,191,.17);
    --colors-pinkA5: rgba(255,59,193,.219);
    --colors-pinkA6: rgba(254,56,182,.291);
    --colors-pinkA7: rgba(255,45,181,.407);
    --colors-pinkA8: rgba(255,28,172,.608);
    --colors-pinkA9: rgba(255,74,189,.817);
    --colors-pinkA10: rgba(255,83,189,.875);
    --colors-pinkA11: rgba(255,95,188,.96);
    --colors-pinkA12: rgba(255,239,251,.98);
    --colors-plum1:  #1d131d;
    --colors-plum2:  #251425;
    --colors-plum3:  #341a34;
    --colors-plum4:  #3e1d40;
    --colors-plum5:  #48214b;
    --colors-plum6:  #542658;
    --colors-plum7:  #692d6f;
    --colors-plum8:  #883894;
    --colors-plum9:  #ab4aba;
    --colors-plum10: #bd54c6;
    --colors-plum11: #d864d8;
    --colors-plum12: #fbecfc;
    --colors-plumA1: transparent;
    --colors-plumA2: rgba(251,47,251,.036);
    --colors-plumA3: rgba(254,88,254,.102);
    --colors-plumA4: rgba(241,83,255,.155);
    --colors-plumA5: rgba(241,88,254,.204);
    --colors-plumA6: rgba(238,92,254,.262);
    --colors-plumA7: rgba(238,90,255,.363);
    --colors-plumA8: rgba(233,89,255,.527);
    --colors-plumA9: rgba(234,98,255,.695);
    --colors-plumA10: rgba(243,106,255,.748);
    --colors-plumA11: rgba(255,117,255,.828);
    --colors-plumA12: rgba(255,240,255,.98);
    --colors-purple1: #1b141d;
    --colors-purple2: #221527;
    --colors-purple3: #301a3a;
    --colors-purple4: #3a1e48;
    --colors-purple5: #432155;
    --colors-purple6: #4e2667;
    --colors-purple7: #5f2d84;
    --colors-purple8: #7938b2;
    --colors-purple9: #8e4ec6;
    --colors-purple10: #9d5bd2;
    --colors-purple11: #bf7af0;
    --colors-purple12: #f7ecfc;
    --colors-purpleA1: transparent;
    --colors-purpleA2: rgba(181,42,251,.045);
    --colors-purpleA3: rgba(188,67,254,.129);
    --colors-purpleA4: rgba(190,72,254,.191);
    --colors-purpleA5: rgba(188,73,255,.248);
    --colors-purpleA6: rgba(183,75,255,.328);
    --colors-purpleA7: rgba(177,75,255,.456);
    --colors-purpleA8: rgba(171,75,255,.66);
    --colors-purpleA9: rgba(181,97,255,.748);
    --colors-purpleA10: rgba(189,109,255,.801);
    --colors-purpleA11: rgba(203,129,255,.934);
    --colors-purpleA12: rgba(252,240,255,.98);
    --colors-red1: #1f1315;
    --colors-red2: #291415;
    --colors-red3: #3c181a;
    --colors-red4: #481a1d;
    --colors-red5: #541b1f;
    --colors-red6: #671e22;
    --colors-red7: #822025;
    --colors-red8: #aa2429;
    --colors-red9: #e5484d;
    --colors-red10:  #f2555a;
    --colors-red11:  #ff6369;
    --colors-red12:  #feecee;
    --colors-redA1:  transparent;
    --colors-redA2:  rgba(253,40,21,.045);
    --colors-redA3:  rgba(254,58,61,.13);
    --colors-redA4:  rgba(254,57,64,.184);
    --colors-redA5:  rgba(255,53,63,.237);
    --colors-redA6:  rgba(255,53,60,.322);
    --colors-redA7:  rgba(255,48,59,.442);
    --colors-redA8:  rgba(255,47,54,.621);
    --colors-redA9:  rgba(255,79,85,.884);
    --colors-redA10: rgba(255,89,95,.942);
    --colors-redA11: rgba(255,100,106,.98);
    --colors-redA12: rgba(255,240,242,.98);
    --colors-sage1:  #141716;
    --colors-sage2:  #191d1b;
    --colors-sage3:  #1f2421;
    --colors-sage4:  #252a27;
    --colors-sage5:  #2a2f2c;
    --colors-sage6:  #303633;
    --colors-sage7:  #393f3c;
    --colors-sage8:  #4a524e;
    --colors-sage9:  #66736d;
    --colors-sage10: #75817b;
    --colors-sage11: #99a29e;
    --colors-sage12: #eceeed;
    --colors-sageA1: transparent;
    --colors-sageA2: rgba(212,254,214,.026);
    --colors-sageA3: rgba(213,251,215,.057);
    --colors-sageA4: rgba(227,255,229,.082);
    --colors-sageA5: rgba(232,254,234,.104);
    --colors-sageA6: rgba(229,254,238,.134);
    --colors-sageA7: rgba(234,254,242,.173);
    --colors-sageA8: rgba(232,254,242,.255);
    --colors-sageA9: rgba(227,255,241,.397);
    --colors-sageA10: rgba(232,255,243,.457);
    --colors-sageA11: rgba(242,255,249,.6);
    --colors-sageA12: rgba(253,255,254,.927);
    --colors-sand1: #161615;
    --colors-sand2: #1c1c1a;
    --colors-sand3: #232320;
    --colors-sand4: #282826;
    --colors-sand5: #2e2e2b;
    --colors-sand6: #353431;
    --colors-sand7: #3e3e3a;
    --colors-sand8: #51504b;
    --colors-sand9: #717069;
    --colors-sand10: #7f7e77;
    --colors-sand11: #a1a09a;
    --colors-sand12: #ededec;
    --colors-sandA1: transparent;
    --colors-sandA2: hsla(60,90%,91%,.026);
    --colors-sandA3: hsla(60,96%,93%,.056);
    --colors-sandA4: hsla(60,76%,96%,.078);
    --colors-sandA5: hsla(60,82%,95%,.104);
    --colors-sandA6: hsla(41,88%,95%,.134);
    --colors-sandA7: hsla(60,95%,96%,.172);
    --colors-sandA8: hsla(49,94%,96%,.254);
    --colors-sandA9: hsla(52,97%,96%,.391);
    --colors-sandA10: hsla(52,98%,97%,.451);
    --colors-sandA11: hsla(51,97%,98%,.597);
    --colors-sandA12: rgba(255,255,254,.923);
    --colors-sky1: #0c1820;
    --colors-sky2: #071d2a;
    --colors-sky3: #082636;
    --colors-sky4: #082d41;
    --colors-sky5: #08354c;
    --colors-sky6: #083e59;
    --colors-sky7: #064b6b;
    --colors-sky8: #005d85;
    --colors-sky9: #68ddfd;
    --colors-sky10:  #8ae8ff;
    --colors-sky11:  #2ec8ee;
    --colors-sky12:  #eaf8ff;
    --colors-skyA1:  transparent;
    --colors-skyA2:  rgba(0,135,254,.045);
    --colors-skyA3:  rgba(0,165,254,.099);
    --colors-skyA4:  rgba(0,166,255,.148);
    --colors-skyA5:  rgba(0,169,254,.198);
    --colors-skyA6:  rgba(0,174,254,.256);
    --colors-skyA7:  rgba(0,174,254,.337);
    --colors-skyA8:  rgba(0,174,255,.453);
    --colors-skyA9: rgba(106,225,255,.98);
    --colors-skyA10: rgba(141,236,255,.98);
    --colors-skyA11: rgba(49,214,255,.924);
    --colors-skyA12: rgba(239,253,255,.98);
    --colors-slate1: #151718;
    --colors-slate2: #1a1d1e;
    --colors-slate3: #202425;
    --colors-slate4: #26292b;
    --colors-slate5: #2b2f31;
    --colors-slate6: #313538;
    --colors-slate7: #3a3f42;
    --colors-slate8: #4c5155;
    --colors-slate9: #697177;
    --colors-slate10: #787f85;
    --colors-slate11: #9ba1a6;
    --colors-slate12: #ecedee;
    --colors-slateA1: transparent;
    --colors-slateA2: rgba(213,254,255,.026);
    --colors-slateA3: rgba(214,251,252,.057);
    --colors-slateA4: rgba(226,240,253,.083);
    --colors-slateA5: rgba(223,243,253,.109);
    --colors-slateA6: rgba(223,239,254,.139);
    --colors-slateA7: rgba(224,243,255,.182);
    --colors-slateA8: rgba(229,242,254,.265);
    --colors-slateA9: rgba(225,241,255,.412);
    --colors-slateA10: rgba(231,243,255,.472);
    --colors-slateA11: rgba(239,247,255,.615);
    --colors-slateA12: rgba(253,254,255,.927);
    --colors-teal1: #091915;
    --colors-teal2: #04201b;
    --colors-teal3: #062923;
    --colors-teal4: #07312b;
    --colors-teal5: #083932;
    --colors-teal6: #09443c;
    --colors-teal7: #0b544a;
    --colors-teal8: #0c6d62;
    --colors-teal9: #12a594;
    --colors-teal10: #10b3a3;
    --colors-teal11: #0ac5b3;
    --colors-teal12: #e1faf4;
    --colors-tealA1: transparent;
    --colors-tealA2: rgba(0,251,213,.031);
    --colors-tealA3: rgba(0,253,220,.07);
    --colors-tealA4: rgba(0,253,232,.105);
    --colors-tealA5: rgba(2,254,228,.14);
    --colors-tealA6: rgba(9,255,230,.187);
    --colors-tealA7: rgba(17,255,227,.257);
    --colors-tealA8: rgba(17,255,231,.366);
    --colors-tealA9: rgba(24,255,228,.609);
    --colors-tealA10: rgba(19,255,231,.67);
    --colors-tealA11: rgba(10,255,231,.748);
    --colors-tealA12: rgba(230,255,249,.979);
    --colors-tomato1: #1d1412;
    --colors-tomato2: #2a1410;
    --colors-tomato3: #3b1813;
    --colors-tomato4: #481a14;
    --colors-tomato5: #541c15;
    --colors-tomato6: #652016;
    --colors-tomato7: #7f2315;
    --colors-tomato8: #a42a12;
    --colors-tomato9: #e54d2e;
    --colors-tomato10: #ec5e41;
    --colors-tomato11: #f16a50;
    --colors-tomato12: #feefec;
    --colors-tomatoA1: transparent;
    --colors-tomatoA2: rgba(253,21,0,.058);
    --colors-tomatoA3: rgba(255,48,25,.133);
    --colors-tomatoA4: rgba(254,51,28,.191);
    --colors-tomatoA5: rgba(254,53,30,.244);
    --colors-tomatoA6: rgba(255,57,30,.319);
    --colors-tomatoA7: rgba(255,55,25,.434);
    --colors-tomatoA8: rgba(255,58,18,.598);
    --colors-tomatoA9: rgba(255,84,49,.885);
    --colors-tomatoA10: rgba(255,100,69,.916);
    --colors-tomatoA11: rgba(255,112,84,.939);
    --colors-tomatoA12: rgba(255,243,240,.98);
    --colors-violet1: #17151f;
    --colors-violet2: #1c172b;
    --colors-violet3: #251e40;
    --colors-violet4: #2c2250;
    --colors-violet5: #32275f;
    --colors-violet6: #392c72;
    --colors-violet7: #443592;
    --colors-violet8: #5842c3;
    --colors-violet9: #6e56cf;
    --colors-violet10: #7c66dc;
    --colors-violet11: #9e8cfc;
    --colors-violet12: #f1eefe;
    --colors-violetA1: transparent;
    --colors-violetA2: rgba(116,58,253,.054);
    --colors-violetA3: rgba(116,82,254,.148);
    --colors-violetA4: rgba(118,80,255,.219);
    --colors-violetA5: rgba(118,84,255,.286);
    --colors-violetA6: rgba(114,83,255,.371);
    --colors-violetA7: rgba(112,83,255,.514);
    --colors-violetA8: rgba(111,82,255,.733);
    --colors-violetA9: rgba(134,104,255,.786);
    --colors-violetA10: rgba(142,117,255,.844);
    --colors-violetA11: rgba(161,142,255,.98);
    --colors-violetA12: rgba(245,242,255,.98);
    --colors-yellow1: #1c1500;
    --colors-yellow2: #221a00;
    --colors-yellow3: #2c2100;
    --colors-yellow4: #352800;
    --colors-yellow5: #3e3000;
    --colors-yellow6: #493c00;
    --colors-yellow7: #594a05;
    --colors-yellow8: #705e00;
    --colors-yellow9: #f5d90a;
    --colors-yellow10: #ffef5c;
    --colors-yellow11: #f0c000;
    --colors-yellow12: #fffad1;
    --colors-yellowA1: transparent;
    --colors-yellowA2: rgba(250,205,0,.027);
    --colors-yellowA3: rgba(253,190,0,.071);
    --colors-yellowA4: rgba(253,194,0,.111);
    --colors-yellowA5: rgba(254,199,0,.15);
    --colors-yellowA6: rgba(254,216,0,.199);
    --colors-yellowA7: rgba(255,219,19,.269);
    --colors-yellowA8: rgba(254,216,0,.371);
    --colors-yellowA9: rgba(255,226,10,.956);
    --colors-yellowA10: rgba(255,244,94,.98);
    --colors-yellowA11: rgba(255,204,0,.934);
    --colors-yellowA12: rgba(255,255,213,.98);
    --colors-brand1: #041b10;
    --colors-brand2: #051f13;
    --colors-brand3: #072719;
    --colors-brand4: #092f1f;
    --colors-brand5: #0b3724;
    --colors-brand6: #10472f;
    --colors-brand7: #155b3d;
    --colors-brand8: #1d724c;
    --colors-brand9: #3fcf8e;
    --colors-brand10: #85e0b7;
    --colors-brand11: #33cc87;
    --colors-brand12: #ebfaf3;
    --pd-sm:0.2rem;
    --pd-md:0.5rem;
    --pd-lg:1rem;
    --pd-largest:1.5rem;
    --pd-top-bottom-sm:5rem;
    --pd-top-bottom-md:10rem;
    --pd-top-bottom-lg:15rem;
  } 
  
  textarea {
    border: none;
    outline: none;
    resize: none;
    font-size:1rem;
    font-weight: 800;
    font-family: Inter Tight, sans-serif;
    
    &::placeholder {
      color: #EFEFEF;
    }
  }

  li {
    list-style: none;
    font-size: .5rem;
    
    p {
      padding-left: 0.3rem;
    }
  }

  a,a:active,a:focus {
    color: #1c1c1c;
    cursor: pointer;
  }
  
  button,select,li,ul:focus,div:focus-visible {
    outline: none;
    border: none;
  }

  button {
    cursor:pointer;
  }


  img {
    pointer-events: none;
    user-select: none;
  }

  svg {
    display: block; 
  }


  h1 {
    font-weight: bold;
    font-size:2.25rem;
    pointer-events: none;
  }
  h2 {
    font-size: 1.875rem;
  }

  h3 {
    font-size:1.5rem;
  }

  blockquote {
    padding-left: 1rem;
    border-left: 2px solid #c3c3c3;
    margin-top: 0.3rem;
    margin-bottom: 0.3rem;
  }


  code {
    background-color: #c3c3c3;
    color: white;
  }



  .pl_m {
    padding-left: var(--pd-md);
  }
  .pr_m {
    padding-right:  var(--pd-md);
  }

  .p_m {
    padding: var(--pd-md);
  }

  .round_sm {
    border-radius: 5px;
  }

  .round_m {
    border-radius: var(--pd-md);
  }

  .center {
    display:flex;
    align-items: center;
    justify-content:center;
  }

  .caption {
    font-family: Exo, sans-serif;
    font-size: .8rem;
    font-weight: 700;
  }

  .heightligh {
    color:red;
  }


  .has-focus {
    background-color: red;
  }


  .tableWrapper {
    padding: 0;
    overflow-x: auto;
    cursor: default!important;
  


    &::-webkit-scrollbar {
      width: 100%;
      height:  var(--pd-md);
    }


    &::-webkit-scrollbar-thumb {
      background: #555;

      &:hover {
        background: #1c1c1c;
      }
    }
  }

  .slate-p {
    line-height: 1;
  }

  .slate-align-center{
    text-align: center;
    position: relative;
    &::before{
      left:50%;
      transform: translateX(-50%);
      width:10rem;
    }
  }

  .slate-align-right {
    text-align: right;
    position: relative;
    &::before{
      right:0;
    }
  }

  hr.slate-HrElement-hr {
    padding-top: 0;
    padding-bottom: 0;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }

  hr.bGpDwk {
    background-color: #747474;
  }

  pre.slate-code_block {
    background-color:#1c1c1c;
    margin-top: var(--pd-md);
    margin-bottom: var(--pd-md);

    & > select {
      background-color: #1c1c1c;
      color: white;

      &::-webkit-scrollbar {
        width: 100%;
        height: var(--pd-md);
      }


      &::-webkit-scrollbar-thumb {
        background: #555;
        &:hover {
          background: #1c1c1c;
        }
      }
    }

    span {

      & >.keyword {
        color: var(--colors-plumA9);
      }

      & >.operator 
      >.url {
        color:var(--colors-brownA11);
      }

      & >.comment {
        color: slategray;
      }
      
      & >.variable, 
      >.regex {
        color: var(--colors-yellow11);
      }

      & >.boolean, 
      >.number, 
      >.constant, 
      >.symbol,
      >.selector {
        color: var(--colors-orange11);
      }

      

      & >.punctuation{
        color: var(--colors-skyA9);
      }

      & >.string,
      >.char,
      >.tag {
        color: var(--colors-mintA9);
      }

      & >.function {
        color: var(--colors-crimsonA10);
      }

      & >.literal-property{
        color: var(--colors-crimsonA11)
      }
    }
  }


  .tippy_style {
    background-color:#1c1c1c;
    padding:0.3rem 0.5rem;
    color: #F0F0F0;
    border-radius: 5px;
    font-size: 0.8rem;
  }


  button[data-testid="ToolbarButton"]{
    color:#C0C0C0;
  }


  .slate-mark_selector-1-active,
  .slate-mark_selector-2-active,
  .slate-ToolbarButton-active{
    color:black !important;    
  }

  .mark_selector{
    display: flex;
    position: relative;
    margin-right: 8px;
    /* transform: translateY(1px); */

    &-drop {
      position: relative;
      width: 4px;
      right: 8px;
      top: 8px;

      svg {
        cursor: pointer;
      }
    }

    &-popup {
      background-color: #1c1c1c;
      border-radius: 5px;
      width: auto;
      box-shadow: 0 0 .2rem rgba(0,0,0,0.5);
      border: 1px solid #555;
      padding:0;
      display: flex;
      flex-direction: column;
      padding:0.3rem 0;
    


      &-item {
        display: flex;
        align-items: center;
        color: white;
        padding: 0.2rem 0.8rem;
        cursor: pointer;

        &:hover {
          background-color:#555;
        }

        & > span:nth-child(1){
          width: 0.6rem;
          font-size: 0.7rem;
          color: green;
          display: flex;
        }

        & > span:nth-child(2){
          height: 1.3rem;
          padding:0 0.5rem;
          display: flex;
          align-items: center;

          svg {
            width: 1.2rem;
            height: 1.2rem;
          }
        }

        & > span:nth-child(3){
          font-size: 0.6rem;
        }
      }
    }
  }

  [data-testid="ColorPicker"]{
    border: 2px solid #555;
    border-radius: 5px;
    box-shadow: 0 0 0.1rem rgba(0,0,0,0.1);

    & > div > div {
      button {
        width: 95%;
        font-weight: 900;

        &:hover {
          background-color:#1c1c1c;
          color: white;
        }
      }
    }
  

    & > button[data-testid="ColorPickerClear"]{
      width: 95%;
      font-weight: 900;

      &:hover {
        background-color:#1c1c1c;
        color: white;
      }
    }


    button[data-testid="ColorButton"]{
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        box-shadow: unset;
        border: 2px solid #1c1c1c;
        box-sizing: content-box;
      }

      svg {
        width: 1.5rem;
        height: 1.5rem;
      }
    }
  }

  
  .tippy-box[data-theme~=dark] {
    background-color: #1c1c1c;
    color: #c0c0c0;
    font-size: 0.5rem;
    border-radius: 5px;
    font-weight: 700;
  }

  .TtHLj {
    border-radius: 5px;
    .iflLRb{
      box-shadow: 0 0 0.5rem rgba(0,0,0,0.2);
      border: 2px solid #1c1c1c;

      & > nav#emoji-nav {
        & > div > div {
          background-color: #1c1c1c;
        }
      }

      input[type="text"]{
        &::placeholder{
        
        }
      }

      svg {
        fill: #1c1c1c;
      }

      [data-id="scroll"]{
        &::-webkit-scrollbar{
          width: 5px;
        }
        &::-webkit-scrollbar-thumb {
          background-color: #1c1c1c;
          border: unset;
        }
      }
    }
  }

  .diuqSz {
    box-shadow: 0 0 0.2rem rgba(0,0,0,0.3) !important;
    background: #1c1c1c !important;;
    
    & > div.cKeavz {
      input {
        color: white !important;;

        &::placeholder {
          color: #ccc !important;;
        }
      }
    }
  }
  .hbmPqc {
    background: #1c1c1c;
    color: white;
    border-radius: 5px;

    .jYjDDa {
      background-color: #555;
    }
    button , a {
      background: inherit;
      color: inherit;

      &:hover {
        background: inherit;
        color:#cccccc;
      }
    }
  }

`

type ThemeKey =
  | 'primary'
  | 'primary_high'
  | 'primary_2'
  | 'primary_3'
  | 'primary_dark'
  | 'primary_high_2'
  | 'secondary'
  | 'secondary_light'
  | 'secondary_light_2'
  | 'tertiary'
  | 'white'
  | 'shadow'

type PaddingKey =
  | 'pd_sm'
  | 'pd_md'
  | 'pd_lg'
  | 'pd_top_bottom_sm'
  | 'pd_top_bottom_md'
  | 'pd_top_bottom_lg'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      readonly [key in ThemeKey]: string
    }
    padding: {
      readonly [key in PaddingKey]: string
    }
  }
}

export const theme: DefaultTheme = {
  colors: {
    primary: 'var(--colors-slate1)',
    primary_2: 'var(--colors-sand11)',
    primary_3: 'var(--colors-sand8)',
    primary_high: 'var(--colors-gray11)',
    primary_high_2: 'var(--colors-bronze6)',
    primary_dark: 'var(--colors-bronze1)',
    secondary: 'var(--colors-gray12)',
    secondary_light: 'var(--colors-mauve12)',
    secondary_light_2: 'var(--colors-slateA12)',
    tertiary: 'var(--colors-violetA11)',
    white: 'var(--colors-slateA12)',
    shadow: 'rgba(0,0,0,0.25)',
  },
  padding: {
    pd_sm: 'var(--pd-sm)',
    pd_md: 'var(--pd-md)',
    pd_lg: 'var(--pd-lg)',
    pd_top_bottom_sm: 'var(--pd--top-bottom-sm)',
    pd_top_bottom_md: 'var(--pd--top-bottom-md)',
    pd_top_bottom_lg: 'var(--pd--top-bottom-lg)',
  },
}
