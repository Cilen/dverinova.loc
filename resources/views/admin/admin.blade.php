@extends('layouts.admin-tpl')

@section('content')
   {{ isset($data) ? $data : 'Default' }}
@endsection
