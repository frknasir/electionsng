@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-10 ml-auto mr-auto">
            <div class="card card-signup p-5">
                <h2 class="card-title text-center">Login</h2>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-5 ml-auto">
                            <div class="info">
                                <div class="icon icon-rose">
                                    <i class="material-icons">timeline</i>
                                </div>
                                <div class="description">
                                    <h4 class="info-title">ElectionsNG</h4>
                                    <p class="description">
                                        <span>Be part of history!</span>
                                        <br><br>

                                        <span>
                                            Login and contribute to greatness.
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-5 mr-auto">
                            <div class="social text-center">
                                <button class="btn btn-just-icon btn-round btn-twitter">
                                    <i class="fa fa-twitter"></i>
                                </button>
                                <button class="btn btn-just-icon btn-round btn-dribbble">
                                    <i class="fa fa-dribbble"></i>
                                </button>
                                <button class="btn btn-just-icon btn-round btn-facebook">
                                    <i class="fa fa-facebook"> </i>
                                </button>
                                <h4 class="mt-3"> or be classical </h4>
                            </div>
                            <form class="form" method="POST" action="{{ route('login') }}" aria-label="{{ __('Login') }}">
                                @csrf
                                <div class="form-group has-default bmd-form-group">
                                    <div class="input-group">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text">
                                                <i class="material-icons">mail</i>
                                            </span>
                                        </div>
                                        <input id="email" type="email" class="form-control{{ $errors->has('email') ? ' is-invalid' : '' }}" name="email" value="{{ old('email') }}" 
                                        placeholder="email" required>

                                        @if ($errors->has('email'))
                                            <span class="invalid-feedback" role="alert">
                                                <strong>{{ $errors->first('email') }}</strong>
                                            </span>
                                        @endif
                                    </div>
                                </div>
                                <div class="form-group has-default bmd-form-group">
                                    <div class="input-group">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text">
                                                <i class="material-icons">lock_outline</i>
                                            </span>
                                        </div>
                                        <input id="password" type="password" class="form-control{{ $errors->has('password') ? ' is-invalid' : '' }}" name="password" 
                                        placeholder="password" required>

                                        @if ($errors->has('password'))
                                            <span class="invalid-feedback" role="alert">
                                                <strong>{{ $errors->first('password') }}</strong>
                                            </span>
                                        @endif
                                    </div>
                                </div>
                                <!--<div class="form-check">
                                    <label class="form-check-label">
                                        <input class="form-check-input" type="checkbox" value="" checked="">
                                        <span class="form-check-sign">
                                            <span class="check"></span>
                                        </span>
                                        I agree to the
                                        <a href="#something">terms and conditions</a>.
                                    </label>
                                </div>-->
                                <div class="text-center">
                                    <div class="col-md-6 offset-md-4">
                                        <button type="submit" class="btn btn-info">
                                            {{ __('Login') }}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection