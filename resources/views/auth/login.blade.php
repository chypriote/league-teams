@extends('layouts.app')

@section('content')
    <div class="column col-4"></div>
    <div class="column col-5">
        <div class="card">
            <header>Connexion</header>
            <div class="card-body">
                <form role="form" method="POST" action="{{ url('/login') }}">
                    {{ csrf_field() }}

                    <fieldset class="form-group {{ $errors->has('email') ? ' has-error' : '' }}">
                        <label for="email" class="form-label">Addresse e-mail</label>

                        <input id="email" type="email" class="form-input" name="email" value="{{ old('email') }}" required autofocus>

                        @if ($errors->has('email'))
                            <span class="help-block">
                                <strong>{{ $errors->first('email') }}</strong>
                            </span>
                        @endif
                    </fieldset>

                    <fieldset class="form-group{{ $errors->has('password') ? ' has-error' : '' }}">
                        <label for="password" class="col-4 form-label">Mot de passe</label>

                        <input id="password" type="password" class="form-input" name="password" required>

                        @if ($errors->has('password'))
                            <span class="help-block">
                                <strong>{{ $errors->first('password') }}</strong>
                            </span>
                        @endif
                    </fieldset>

                    <fieldset class="form-group">
                        <div class="form-bar --spaced">
                            <label for="remember" class="form-checkbox">Se souvenir de moi
                                <input type="checkbox" name="remember" id="remember">
                                <i class="form-icon"></i>
                            </label>
                            <a class="btn btn-link" href="{{ url('/password/reset') }}">Mot de passe oublié ?</a>
                        </div>
                    </fieldset>

                    <div class="form-group">
                        <div class="form-bar --spaced">
                            <a href="/" class="btn">Annuler</a>
                            <button type="submit" class="btn btn-primary">Connexion</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
@endsection
