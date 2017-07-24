<?php
// Main
Breadcrumbs::register('main', function($breadcrumbs)
{
    $breadcrumbs->push(trans("localization.main"), route('main'));
});
// Main > Contacts
Breadcrumbs::register('contacts', function($breadcrumbs)
{
    $breadcrumbs->parent('main');
    $breadcrumbs->push(trans("localization.contacts"), route('contacts'));
});
// Main > [Category]
Breadcrumbs::register('category', function($breadcrumbs, $category)
{
    $breadcrumbs->parent('main');
    $breadcrumbs->push(trans("localization.$category"), route('category', $category));
});

// Main > [Category] > [Type]
Breadcrumbs::register('type', function($breadcrumbs, $category, $type)
{
    $breadcrumbs->parent('category', $category);
    $breadcrumbs->push(trans("localization.$type"), route('type', ['category' => $category, 'type' => $type]));
});

// Main > [Category] > [Type] > [ItemWithType]
Breadcrumbs::register('itemWithType', function($breadcrumbs, $data)
{
    $breadcrumbs->parent('type', $data['category'], $data['type']);
    $breadcrumbs->push($data['name'], route('itemWithType', ['category' => $data['category'], 'type' => $data['type'], 'idProduct' => $data['id_product']]));
});

// Main > [Category] > [Item]
Breadcrumbs::register('item', function($breadcrumbs, $data)
{
    $breadcrumbs->parent('category', $data['category']);
    $breadcrumbs->push($data['name'], route('item', ['category' => $data['category'], 'idProduct' => $data['id_product']]));
});
//
//// Main > [Category] > [Type] > [ItemWithType]
//Breadcrumbs::register('itemWithType', function($breadcrumbs, $category, $type, $id_product)
//{
//    $breadcrumbs->parent('type', $category, $type);
//    $breadcrumbs->push('', route('itemWithType', ['category' => $category, 'type' => $type, 'id_product' => $id_product]));
//});
//// Main > [Category] > [Item]
//Breadcrumbs::register('item', function($breadcrumbs, $category, $id_product)
//{
//    $breadcrumbs->parent('category', $category);
//    $breadcrumbs->push('', route('item', ['category' => $category, 'id_product' => $id_product]));
//});