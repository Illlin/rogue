package uk.co.zacgarby.roguelike;
import com.badlogic.gdx.graphics.Color;

public class LightEmitter {
	Coord place;
	Color color;
	int brightness;

	public LightEmitter(Coord place, Color color, int brightness) {
		this.place = place;
		this.color = color;
		this.brightness = brightness;
	}

}
