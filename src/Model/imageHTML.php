<?php

function getStringHTML(){}
<div class='col-md-3 portfolio-item img_gallery panel panel-default flex-col outer' id="eachFigure" data-content="{{ loop.length }}">
    <figure class='snip0016 img1 embed news'><img class='img-responsive img_profile ' id="link_image_{{ loop.index }}" src='../{{ img.img_path }}' />
        <figcaption>
            <h2>
                <span>
                    <A id='title_image_{{ loop.index }}' href='../image/{{ img.id }}'>{{ img.title }}</A>
                </span></h2><p><h2><A href='../profile/{{ images.uname_pop[loop.index-1] }}' id="link_username">{{ images.uname_pop[loop.index-1] }}</A>
            </h2>
            </p>
            <p class="label_like{{ img.id }}" id='label_like'>Likes: {{ img.likes }}</p>
        </figcaption>
    </figure>
    <div class="col-sm-15 divLinia">
        <div class="panel panel-white post panel-shadow divLinia">
            <div id='statusError{{ img.id }}' class="alert alert-danger statusError" role="alert" hidden>
                <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                <span class="sr-only">Error:</span>
                Solo puedes añadir un comentario en la imagen
            </div>
            <div id='divLinia' class="post-footer divLinia">
                {% if app.idUser>0 %}
                <div class='row' >
                    <div class='col likeButton' align='center'>
                        {% if img.liked == 1 %}
                        <a class='btn btn-simple btn-just-icon' ><img class="likeImg" src='../assets/img/icons/like_filled.png' width='30' height='30' data-content="{{ img.id }}"/>
                        </a>
                        {% else %}
                        <a class='btn btn-simple btn-just-icon'><img class="likeImg" src='../assets/img/icons/like.png' width='30' height='30' data-content="{{ img.id }}"/>
                        </a>
                        {% endif %}
                    </div>
                    <div class='col'>
                        <div class="input-group" id="inputCommentGroup" >
                            <input id='commentInput{{ img.id }}' class="form-control" placeholder="Añadir un comentario" type="text" data-content="{{ img.user_id }}">
                            <span class="input-group-addon" id ="commentButton" data-content="{{ img.id }}">
                                    <a>
                                        <i class="fa fa-edit">
                                        </i>
                                    </a>
                                </span>
                        </div>

                    </div>

                </div>
                {% endif %}
                <div id='comentaris{{ img.id }}'>
                    {% if img.comments %}
                    {% for comment in img.comments %}
                    <ul class="comments-list" id="comments-list{{ img.id }}">
                        <li class="comment">
                            <a class="pull-left" href="#">
                                <img class="avatar" src="../{{ comment[2]  }}">
                            </a>
                            <div class="comment-body">
                                <div class="comment-heading">
                                    <h4 class="user">{{ comment[0] }}</h4>
                                    <h5 class="time"> {{ comment[3]  }}</h5>
                                </div>
                                <p>{{ comment[1]  }}</p>
                            </div>
                        </li>
                    </ul>
                    {% endfor %}
                    {% else %}
                    <ul class="comments-list" id="comments-list{{ img.id }}">
                        <li class="comment">
                            <div class="comment-body">
                                <div class="comment-heading">
                                    <h4 class="noComments">No hay ningún comentario</h4>
                                </div>
                            </div>
                        </li>
                    </ul>
                    {% endif %}
                </div>
            </div>
        </div>
    </div>
</div>
{% endblock %}