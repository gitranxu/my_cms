function change_bg(o_lunbo){
	var bg_color = o_lunbo.$ul.find('>li:eq('+o_lunbo.i_now+')').attr('bg_color');
	o_lunbo.$container.parents('.lunbo_unit').css('background',bg_color);
}