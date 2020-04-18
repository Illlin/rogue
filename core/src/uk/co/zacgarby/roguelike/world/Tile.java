package uk.co.zacgarby.roguelike.world;

import com.badlogic.gdx.graphics.g2d.SpriteBatch;

public abstract class Tile {
	public int x, y;
	public boolean passable;
	
	public abstract void draw(SpriteBatch batch, int x, int y);
	public abstract void drawlight(SpriteBatch batch, int x, int y);
	
	public void initialise(Level level) {}
}
