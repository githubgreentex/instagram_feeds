odoo.define('instagram_feeds.insta_post', function (require) {
    'use strict';

    var ajax = require('web.ajax');


    $.ajax({
        type: "POST",
        dataType: 'json',
        url: '/instagram_id_token',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({
            'jsonrpc': "2.0",
            'method': "call",
        }),

        success: function (data) {
            if (data.result.error){
                $("#instafeed").after("<div class='text-center font-weight-bold'>There is an error in access token please generate and try again</div>");
            }
            else if (data.result.result.error) {
                $("#instafeed").after("<div class='text-center font-weight-bold'>There is an error in access token please generate and try again</div>");
                $("#loadmore").attr("style",'display:none !important');
            }
            else{
                var limit = data.result.result.data.length;
                var $for_data = "";
                for (var i = 0; i < limit; i++) {
                    var date = new Date(data.result.result.data[i].timestamp);
                    if (data.result.result.data[i].caption) {
                         var mesage = data.result.result.data[i].caption;
                    } else {
                        var mesage = '';
                    }

                    $for_data += '<div class="grid-item card border-0 mt-2"><div class="card-box-shadow"><div class="card-body"><div class="row pb-sm-3 pb-2"><div class="col-3 text-center"><img class="rounded-circle img-fluid" src="' + data.result.image_url.profile_picture_url + '" /></div><div class="col-9 pl-0"><a class="d-block" href="http://www.instagram.com/">' + data.result.result.data[i].username + '</a><small class="text-muted">'+ date +'</small></div></div><p class="card-text text-secondary more">'+ mesage +'</p></div><img class="img-fluid" src="' + data.result.result.data[i].media_url + '" /><div class="card-body pb-4"><div class="card-post-icon text-secondary"><img src="instagram_feeds/static/src/img/fb-like.png" /><img src="instagram_feeds/static/src/img/fb-heart-icon.png" /><img src="instagram_feeds/static/src/img/fb-emoji-icon.png" /><img src="instagram_feeds/static/src/img/emoji_icon2.png" /><img src="instagram_feeds/static/src/img/emoji_icon3.png" /><img src="instagram_feeds/static/src/img/emoji_icon4.png" /><small class="pl-2"><i class="fa fa-heart"></i> ' +  data.result.result.data[i].like_count +' Likes</small><small class="px-1"><i class="fa fa-comments"></i> ' +  data.result.result.data[i].comments_count +' Comments</small></div><div class="share-post pt-sm-3 pt-2 mt-sm-3 mt-2 border-top"><div class="row"><div class="col-12 px-0 text-center"><a class="d-inline-block py-1 text-primary w-100" href="' + data.result.result.data[i].permalink + '" title="View on Instagram" target="_blank"><small>View on Instagram`</small></a></div></div></div></div></div></div>';
                }

                $('#instafeed').append($for_data);
                    var $grid = $('.grid').masonry({
                        itemSelector: '.grid-item',
                        columnWidth: '.grid-sizer',
                        gutter: '.gutter-sizer',
                        horizontalOrder: true, // new!
                        percentPosition: true,
                    });

                if (data.result.result['paging']['next']) {
                        $("#loadmore").show();
                }
                $("#page").val(1);
                $("#loadmore").on('click', function(e) {
                    /*i++;*/
                    var current_page_number = parseInt($("#page").val());
                    ajax.jsonRpc("/instagram_post_next", 'call', {
                        'page_number': current_page_number,
                    }).then(function(data) {
                        if(data){
                            var limit = data.result.data.length;
                            var $for_data = "";
                            for (var i = 0; i < limit; i++) {
                                var date = new Date(data.result.data[i].timestamp);
                                if (data.result.data[i].caption) {
                                     var mesage = data.result.data[i].caption;
                                } else {
                                    var mesage = '';
                                }

                                $for_data += '<div class="grid-item card border-0 mt-2"><div class="card-box-shadow"><div class="card-body"><div class="row pb-sm-3 pb-2"><div class="col-3 text-center"><img class="rounded-circle img-fluid" src="' + data.image_url.profile_picture_url + '" /></div><div class="col-9 pl-0"><a class="d-block" href="http://www.instagram.com/">' + data.result.data[i].username + '</a><small class="text-muted">' + date +'</small></div></div><p class="card-text text-secondary more">'+ mesage +'</p></div><img class="img-fluid" src="' + data.result.data[i].media_url + '" /><div class="card-body pb-4"><div class="card-post-icon text-secondary"><img src="instagram_feeds/static/src/img/fb-like.png" /><img src="instagram_feeds/static/src/img/fb-heart-icon.png" /><img src="instagram_feeds/static/src/img/fb-emoji-icon.png" /><img src="instagram_feeds/static/src/img/emoji_icon2.png" /><img src="instagram_feeds/static/src/img/emoji_icon3.png" /><img src="instagram_feeds/static/src/img/emoji_icon4.png" /><small class="pl-2">' +  data.result.data[i].like_count +' Likes</small><small class="px-1">' +  data.result.data[i].comments_count +' Comments</small></div><div class="share-post pt-sm-3 pt-2 mt-sm-3 mt-2 border-top"><div class="row"><div class="col-12 px-0 text-center"><a class="d-inline-block py-1 text-primary w-100" href="' + data.result.data[i].permalink + '" title="View on Instagram" target="_blank"><small>View on Instagram`</small></a></div></div></div></div></div></div>';
                            }
                            var $elems = $($for_data);

                            $grid.append($elems).masonry('appended', $elems);
                            if (data.result['paging']['next']) {
                                $("#loadmore").show();
                            } else {
                                $("#loadmore").attr("style",'display:none !important');
                            }
                            $("#page").val(current_page_number + 1)
                        }

                    });

                });
            }

        },
        error: function () {
            console.log("ERROR: <h2>Something went wrong in loading instagram post..</h2>");
        }
    });

    var checkPosition = function() {
        if ($(window).width() >= 1200) {
            //init
            var $grid = $('.grid').masonry({
                itemSelector: '.grid-item',
                masonry: {
                    column: 4
                }
            });
        }
        if ($(window).width() < 1200) {

            var $grid = $('.grid').masonry({
                itemSelector: '.grid-item',
                masonry: {
                    column: 3
                }
            });
        }
        if ($(window).width() < 768) {
            //init
            var $grid = $('.grid').masonry({
                itemSelector: '.grid-item',
                masonry: {
                    column: 2
                }
            });
        }
        if ($(window).width() < 575) {
            //init
            var $grid = $('.grid').masonry({
                itemSelector: '.grid-item',
                masonry: {
                    column: 1
                }
            });
        }

    };
    $(window).scroll(checkPosition);


});