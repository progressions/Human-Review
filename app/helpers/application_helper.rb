module ApplicationHelper
    
  ProtocolRegexp = %r{^[-a-z]+://}.freeze
  
  def test_for_required_variables
    raise "@server is undefined" unless @server
    raise "@version is undefined" unless @version
  end
  
  def blank_image_tag(options = {})
    image_tag('sc_static/blank.gif', options.merge(:alt => 'blank'))
  end
  
  def spinner_image_tag(options = {})
    image_tag('spinner.gif', options.merge(:alt => "Loading"))
  end
  
  def logo_image_tag(options = {})
    image_tag('sc_static/logo_modal', options.merge(:size => "200x49", :alt => "OtherInbox", :class => "logo"))
  end
  
  def toolbar_link(text, view=nil)
    view ||= text
    if view =~ ProtocolRegexp
      view_id = "#{text.gsub(' ', '_').downcase}_link"
    else
      view_id = "#{view.downcase}_link"
    end
    if Application.current_view?(view)
      text
    else
      link_to(text, view, {:id => view_id})
    end
  end
  
end

