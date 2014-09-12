
var GLOBSTAR = '**/*';

var basePaths = {
    src: 'src/',
    dest: 'build/'
};

var typeMap = {
    // templates
    jade:       ['*.jade'],

    // styles
    css:        [GLOBSTAR + '.css'],
    less:       [GLOBSTAR + '.less'],

    // scripts
    js:         [GLOBSTAR + '.js', '!vendor/*.js'],
    coffee:     [GLOBSTAR + '.coffee'],
    jslibs:     ['vendor/*.js'],

    // images
    png:        [GLOBSTAR + '.png'],
    jpg:        [GLOBSTAR + '.jpg', GLOBSTAR + '.jpeg'],
    gif:        [GLOBSTAR + '.gif'],
    svg:        [GLOBSTAR + '.svg'],

    // extras
    extras:   [GLOBSTAR]
};

module.exports = {
  SERVER_PORT: 1337,
  GLOBSTAR: GLOBSTAR,
  basePaths: basePaths,


  typePaths: {
    templates: {
      src: basePaths.src + 'templates/',
      dest: basePaths.dest + ''
    },
    styles: {
      src: basePaths.src + 'styles/',
      dest: basePaths.dest + 'styles/'
    },
    scripts: {
      src: basePaths.src + 'scripts/',
      dest: basePaths.dest + 'scripts/'
    },
    images: {
      src: basePaths.src + 'images/',
      dest: basePaths.dest + 'images/'
    },
    extras: {
      src: basePaths.src + 'extras/',
      dest: basePaths.dest + ''
    }
  },

  typeMap: typeMap,

  appFiles: {
    templates:  typeMap.jade,
    styles:     typeMap.css.concat(typeMap.less),
    scripts:    typeMap.js.concat(typeMap.coffee),
    images:     typeMap.png.concat(typeMap.gif).concat(typeMap.jpg).concat(typeMap.svg),
    extras:     typeMap.extras
  },

  vendorFiles: {
    scripts:    typeMap.jslibs
  },

  scriptOrder: [
    'modernizr-2.6.2.min.js',
    'jquery-1.10.2.min.js',
    'retina-1.1.0.js',
    'jquery.easing.min.js',
    'jquery.scrollTo.js',
    'waypoints.js',
    'jquery.easypiechart.js',
    'jquery.magnific-popup.js',
    'jquery.mixitup.js',
    'owl.carousel.js',
    'jquery.fittext.js',
    'jquery.simple-text-rotator.js',
    'jquery.fitvids.js',
    'detectmobilebrowser.js',
    'jquery.mb.YTPlayer.js',
    'background-video.js',
    'classie.js',
    'helper.js',
    'grid3d.js',
    'script.js'
  ],

  styleOrder: [
    'normalize.css',
    'font-awesome.css',
    'magnific-popup.css',
    'owl.carousel.css',
    'YTPlayer.css',
    'style.css',
    'app.min.css'
  ]
};
