<!-- Pushy Menu -->
<nav class="pushy pushy-left">
    <div class="pushy-content">
        <ul>
            <!-- Submenu -->
            <li class="pushy-link"><a href="{{route('main')}}">Home</a></li>
            {{--<li class="pushy-submenu">--}}
                {{--<button>Статті</button>--}}
                {{--<ul>--}}
                    {{--<li class="pushy-link"><a href="#">Огляд</a></li>--}}
                    {{--<li class="pushy-link"><a href="#">Створити статтю</a></li>--}}
                {{--</ul>--}}
            {{--</li>--}}
            <li class="pushy-submenu">
                <button>Товари</button>
                <ul>
                    <li class="pushy-link"><a href="{{ url('admin/product') }}">Огляд</a></li>
                    <li class="pushy-link"><a href="{{ url('admin/product/create') }}">Додати товар</a></li>
                </ul>
            </li>
            <li class="pushy-submenu">
                <button>Замовлення</button>
                <ul>
                    <li class="pushy-link"><a href="{{ url('admin/orders') }}">Нові замовлення</a></li>
                    <li class="pushy-link"><a href="{{ url('admin/oldOrders') }}">Оброблені замовлення</a></li>
                </ul>
            </li>
            <li class="pushy-submenu">
                <button>Зворотній зв'язок</button>
                <ul>
                    <li class="pushy-link"><a href="{{ url('admin/feedback') }}">Нові запити</a></li>
                    <li class="pushy-link"><a href="{{ url('admin/oldFeedback') }}">Оброблені запити</a></li>
                </ul>
            </li>
            {{--<li class="pushy-link"><a href="#">Статистика</a></li>--}}
        </ul>
    </div>
</nav>
<!-- Site Overlay -->
<div class="site-overlay"></div>

<!-- Your Content -->
<div id="container">
    <!-- Menu Button -->
    <button class="menu-btn">&#9776; Menu</button>
</div>

<div class="admin-title-panel">
    <div class="container">
        <div class="row ">
            <span class="admin-title center-block">Панель керування</span>
        </div>
    </div>

</div>
