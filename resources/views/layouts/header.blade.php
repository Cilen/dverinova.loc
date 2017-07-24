<header>
    <div class="container">
        <div class="row">
            <div class="header-block">
                <div class="col-sm-4">
                    <a href="{{route('main')}}"><img src="/images/logo.png"></a>
                </div>
                <div class="col-sm-6 hidden-xs  text-right">
                    <div class="phones">
                        <p><i class="fa fa-phone" aria-hidden="true"></i> 096-777-77-77</p>
                        <p><i class="fa fa-phone" aria-hidden="true"></i> 063-777-77-77</p>
                        <p><a href="#">Зворотній зв'язок</a></p>
                    </div>
                </div>
                <div class="col-sm-2 hidden-xs call-me">
                    <button type="button" class="header-button">Викликати<br>замірника</button>
                </div>
            </div>
        </div>
    </div>
    <nav class="cbp-hsmenu-wrapper" id="cbp-hsmenu-wrapper">
        <div class="cbp-hsinner">
            <ul class="cbp-hsmenu">
                <li><a href="{{route('main')}}">Головна</a></li>
                <li><a href="{{route('category', ['category' => 'externalDoor'])}}">Зовнішні двері</a></li>
                <li>
                    <a href="{{route('category', ['category' => 'internalDoor'])}}">Міжкімнатні двері</a>
                    <ul class="cbp-hssubmenu">
                        <li><a href="{{route('type', ['category' => 'internalDoor', 'type' => 'shponovani'])}}"><img src="/images/menu/shponovani.jpg" alt="shponovani"/><span>Шпоновані</span></a></li>
                        <li><a href="{{route('type', ['category' => 'internalDoor', 'type' => 'ekoshpon'])}}"><img src="/images/menu/ekoshpon.jpg" alt="ekoshpon"/><span>Екошпон</span></a></li>
                        <li><a href="{{route('type', ['category' => 'internalDoor', 'type' => 'emal'])}}"><img src="/images/menu/emal.jpg" alt="emal"/><span>Емаль</span></a></li>
                        <li><a href="{{route('type', ['category' => 'internalDoor', 'type' => 'sosna'])}}"><img src="/images/menu/sosna.jpg" alt="sosna"/><span>З масиву сосни</span></a></li>
                        <li><a href="{{route('type', ['category' => 'internalDoor', 'type' => 'dub'])}}"><img src="/images/menu/dub.png" alt="dub"/><span>З масиву дуба</span></a></li>
                        <li><a href="{{route('type', ['category' => 'internalDoor', 'type' => 'vilkha'])}}"><img src="/images/menu/vilkha.png" alt="vilkha"/><span>З масиву вільхи</span></a></li>
                    </ul>
                </li>
                <li><a href="{{route('category', ['category' => 'tile'])}}">Керамічна плитка</a></li>
                <li><a href="{{route('category', ['category' => 'laminate'])}}">Ламінат</a></li>
                <li><a href="{{route('contacts')}}">Контакти</a></li>
            </ul>
        </div>
    </nav>



    {{-- <nav class="navbar navbar-default navbar-static-top">
         <div class="container">
             <div class="navbar-header">

                 <!-- Collapsed Hamburger -->
                 <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#app-navbar-collapse">
                     <span class="sr-only">Toggle Navigation</span>
                     <span class="icon-bar"></span>
                     <span class="icon-bar"></span>
                     <span class="icon-bar"></span>
                 </button>

                 <!-- Branding Image -->
                 <a class="navbar-brand" href="{{ url('/') }}">
                     {{ config('app.name', 'Laravel') }}
                 </a>
             </div>

             <div class="collapse navbar-collapse" id="app-navbar-collapse">
                 <!-- Left Side Of Navbar -->
                 <ul class="nav navbar-nav">
                     &nbsp;
                 </ul>

                 <!-- Right Side Of Navbar -->
                 <ul class="nav navbar-nav navbar-right">
                     <!-- Authentication Links -->
                     @if (Auth::guest())
                         <li><a href="{{ route('login') }}">Login</a></li>
                         <li><a href="{{ route('register') }}">Register</a></li>
                     @else
                         <li class="dropdown">
                             <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                                 {{ Auth::user()->name }} <span class="caret"></span>
                             </a>

                             <ul class="dropdown-menu" role="menu">
                                 <li>
                                     <a href="{{ route('logout') }}"
                                        onclick="event.preventDefault();
                                                      document.getElementById('logout-form').submit();">
                                         Logout
                                     </a>

                                     <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                         {{ csrf_field() }}
                                     </form>
                                 </li>
                             </ul>
                         </li>
                     @endif
                 </ul>
             </div>
         </div>
     </nav>--}}
</header>