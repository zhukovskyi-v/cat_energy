$(document).ready(function () {
    let toggleBtn = $('.page-header__toggle'),
        mainNav = $('.main-nav'),
        catalogWrap = $('.catalog__wrap'),
        preloader = $('.cssload-fond');


    toggleBtn.on('click', () => {
        mainNav.hasClass("main-nav--closed") ? (mainNav.removeClass("main-nav--closed"), mainNav.addClass("main-nav--opened"),
            toggleBtn.addClass("page-header__toggle--opened")) : (mainNav.addClass("main-nav--closed"), mainNav.removeClass("main-nav--opened"),
            toggleBtn.removeClass("page-header__toggle--opened"))
    });

    const sendForms = () => {
        const form = document.querySelectorAll('form'),
            inputs = document.querySelectorAll('input'),
            formDesc = document.querySelector('.form__desc ');
        console.log(form);

        const message = {
            loading: 'отправка...',
            success: 'Спасибо. Ваша заявка отправлена',
            failure: 'Не отправлено. Попытайтесь позже...'
        };

        const postData = async (url, data) => {
            formDesc.textContent = message.loading;
            let res = await fetch(url, {
                method: "POST",
                body: data
            });
            return await res.text();
        };

        const clearInputs = () => {
            const inputCheckbox = document.querySelectorAll('input[type="checkbox"]');
            inputs.forEach(item => {
                item.value = '';
            });
            inputCheckbox.forEach(currentItem => {
                currentItem.checked = false;
            });
        };

        form.forEach(item => {
            item.addEventListener('submit', (e) => {

                e.preventDefault();

                const formData = new FormData(item);
                console.log(formData);

                postData('server.php', formData)
                    .then(res => {
                        console.log(res);
                        formDesc.textContent = message.success;

                    })
                    .catch(() => formDesc.textContent = message.failure)
                    .finally(() => {
                        clearInputs();
                        setTimeout(() => {
                            formDesc.textContent = '* — Обязательные поля';
                        }, 5000);
                    });
            });
        });
    };
    if (document.querySelector('form')) {
        sendForms();
    }


    if (document.querySelector('.container1')) {
        $((function () {
            $(".container1").twentytwenty({
                default_offset_pct: .7,
                move_slider_on_hover: true,
                move_with_handle_only: true,
                click_to_move: true

            })
        }));

        $('.example-presentation__before-btn').click(function () {
            $(".container1").twentytwenty({
                default_offset_pct: 1
            });
        });
        $('.example-presentation__after-btn').click(function () {
            $(".container1").twentytwenty({
                default_offset_pct: 0
            });
        });
    }
    try {
        function initMap() {
            let position = {
                lat: 59.938722,
                lng: 30.323058
            };
            let opt = {
                center: position,
                zoom: 18
            };
            let myMap = new google.maps.Map(document.getElementById('map'), opt);
            let marker = new google.maps.Marker({
                position: position,
                map: myMap,
            });
            var contentString = '<div class="map_info-adress">\n' +
                '                <p class="map_info-adress_txt">Cat Energy офис</p>\n' +
                '                <p class="map_info-adress_txt">Санкт-Петербург</p>\n' +
                '            </div>';

            let infowindow = new google.maps.InfoWindow({
                content: contentString
            });
            marker.addListener('click', function () {
                infowindow.open(map, marker);
            });
        }

        initMap();
    } catch { //maps
    }


  if (preloader){
      preloader.css('display', 'block');
  }

    $.getJSON("./file.json", function (data) {

        data.results.forEach(item => {
            let {
                card_title,
                bulk_value,
                taste_value,
                image_path,
                image_path_2x,
                image_path__mobile,
                image_path_mobile_2x,
                image_path_tablet,
                image_path_tablet_2x,
                price_value
            } = item;

            let classSmallImg = parseInt(bulk_value) < 999 ? 'catalog-item__img--small' : 'catalog-item__img--big';
            const card = document.createElement('div');

            card.classList.add('catalog__column');
            //рендерим картки
            card.innerHTML = `
                    <div class="catalog-item__img">
                    <picture>
                        <source media="(min-width:1180px)" src="${image_path}", srcset="${image_path_2x}, 2x">
                        <source media="(min-width:660px)" src="${image_path_tablet}", srcset="${image_path_tablet_2x}, 2x">
                        <img src="${image_path__mobile}" srcset="${image_path_mobile_2x}, 2x" alt="${card_title}" class="${classSmallImg}">
                    </picture>
                    </div>
                    <ul class="catalog__table">
                        <h4 class="catalog__table-title title">
                            ${card_title}
                        </h4>
                        <li class="catalog__info-text">
                            <p class="catalog__text catalog__value"> Объем</p> <span
                                class="catalog__text catalog__count">${bulk_value}</span>
                        </li>
                        <li class="catalog__info-text">
                            <p class="catalog__text catalog__taste">Вкус </p> <span
                                class="catalog__text catalog__info-taste-name">${taste_value}</span>
                        </li>
                        <li class="catalog__info-text">
                            <p class="catalog__text catalog__price_text">Цена</p> <span
                                class="catalog__text catalog__price">${price_value}</span>
                        </li>
                    </ul>
                    <button class="catalog__btn btn ">Заказать</button>
                `
            preloader.css('display', 'none');
            catalogWrap.append(card); //добавляем картки на страницу

        });


    });

    const renderCart = (response) => {
        document.querySelectorAll('.catalog__column').forEach(item => {
            item.innerHTML = '';
        })
        catalogWrap.innerHTML = ''; //обнуляем ранее отрендерены элементы
        response.results.forEach(item => {
            let {
                card_title,
                bulk,
                bulk_value,
                taste,
                taste_value,
                image_path,
                image_path_2x,
                image_path__mobile,
                image_path_mobile_2x,
                price,
                price_value
            } = item; //деструктуризация элементов из респонс


            const card = document.createElement('li');

            card.classList.add('catalog__column');
            //рендерим картки
            card.innerHTML = `<div class="catalog__column">
                    <div class="catalog-item__img">
                        <picture>
                            <source media="(min-width:1180px)" srcset="img/catalog-1-desktop.png">
                            <source media="(min-width:660px)" srcset="${image_path}, ${image_path_2x}" >
                            <img src="${image_path__mobile}" srcset="${image_path_mobile_2x}" alt="${card_title}">
                        </picture>
                    </div>
                    <ul class="catalog__table">
                        <h4 class="catalog__table-title title">
                            ${card_title}
                        </h4>
                        <li class="catalog__info-text">
                            <p class="catalog__text catalog__value">${bulk} </p> <span
                                class="catalog__text catalog__count">${bulk_value}</span>
                        </li>
                        <li class="catalog__info-text">
                            <p class="catalog__text catalog__taste">${taste} </p> <span
                                class="catalog__text catalog__info-taste-name">${taste_value}</span>
                        </li>
                        <li class="catalog__info-text">
                            <p class="catalog__text catalog__price_text">${price} </p> <span
                                class="catalog__text catalog__price">${price_value}</span>
                        </li>
                    </ul>
                    <button class="catalog__btn btn ">Заказать</button>
                </div>`

            catalogWrap.append(card); //добавляем картки на страницу
        })
    };
    if (document.querySelectorAll('.catalog__column')) {
        renderCart();
    }





});