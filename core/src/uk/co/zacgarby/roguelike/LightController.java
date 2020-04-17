package uk.co.zacgarby.roguelike;
import com.badlogic.gdx.graphics.Color;
import com.badlogic.gdx.Gdx;
import java.util.ArrayList;

public class LightController {
	int MAXLIGHTS = 64;
	
	public Coord screenSize() {
		return new Coord(
				Gdx.graphics.getWidth() / 4 - Sidebar.background.getWidth(),
				Gdx.graphics.getHeight()
				);
	}
	
	private LightEmitter[] getLights() {
		LightEmitter[] lights = new LightEmitter[1];
		lights[0] = new LightEmitter(new Coord(Main.camX,Main.camY),new Color(255,255,255,0),255);
		return lights;
	}
	
	public ArrayList<Coord> lightPath(Coord start, Coord end){
		ArrayList<Coord> points = new ArrayList<Coord>();
		// Implementation of Bresenham-based supercover line algorithm
		// http://eugen.dedu.free.fr/projects/bresenham/
		
		int i;
		int ystep, xstep;
		int error;
		int errorprev;
		int y = start.y, x = start.x;
		int ddy, ddx;
		int dx = end.x - start.x;
		int dy = end.y - start.y;
		
		points.add(new Coord(start.x, start.y));
		
		if (dy < 0) {
			ystep = -1;
			dy = -dy;
		}else {
			ystep = 1;
		}
		
		if (dx < 0) {
			xstep = -1;
			dx = -dx;
		}else {
			xstep = 1;
		}
		
		ddy = 2 * dy;
		ddx = 2 * dx;
		if (ddx >= ddy) {
			errorprev = error = dx;
			for (i = 0; i < dx ; i++) {
				x += xstep;
				error += ddy;
				if (error > ddx) {
					y += ystep;
					error -= ddx;
					if (error + errorprev < ddx) {
						points.add(new Coord(y-ystep, x));
					} else if (error + errorprev > ddx) {
						points.add(new Coord(y,x-xstep));
					} else {
						points.add(new Coord(y-ystep,x));
						points.add(new Coord(y, x-xstep));
					}
				}
				points.add(new Coord(y,x));
				errorprev = error;
			}
		}else {
			errorprev = error = dy;
			for (i = 0; i < dy; i++) {
				y += ystep;
				error += ddx;
				if (error > ddy) {
					x += xstep;
					error -= ddy;
					if (error + errorprev < ddy) {
						points.add(new Coord(y,x-xstep));
					} else if (error + errorprev > ddy) {
						points.add(new Coord(y-ystep, x));
					}else {
						points.add(new Coord(y,x-xstep));
						points.add(new Coord(y-ystep,x));
					}
				}
				points.add(new Coord(y,x));
				errorprev = error;
			}
		}
		return points;
	}
	
	public void printPoints(ArrayList<Coord> points) {
		for (int i = 0; i < points.size(); i++) {
			System.out.print(points.get(i).x);
			System.out.print(" ");
			System.out.print(points.get(i).y);
			System.out.println(" ");
		}
	}
	
}
