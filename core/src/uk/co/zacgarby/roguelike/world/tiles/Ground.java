package uk.co.zacgarby.roguelike.world.tiles;

import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.graphics.Texture;
import com.badlogic.gdx.graphics.g2d.SpriteBatch;

import uk.co.zacgarby.roguelike.world.Level;
import uk.co.zacgarby.roguelike.world.Tile;

public class Ground extends Tile {
	private static Texture normal = new Texture(Gdx.files.internal("images/tiles/ground.png"));
	private static Texture grassy = new Texture(Gdx.files.internal("images/tiles/grassy-ground.png"));
	private static Texture light  = new Texture(Gdx.files.internal("images/tiles/ground.light.png"));
	
	private boolean isGrassy;
	private Texture tex;
	
	public Ground(int x, int y) {
		this.x = x;
		this.y = y;
		isGrassy = Math.random() < 0.073;
		passable = true;
	}
	
	@Override
	public void draw(SpriteBatch batch, int x, int y) {
		batch.draw(tex, x, y);
	}
	
	@Override
	public void initialise(Level level) {
		tex = isGrassy ? grassy : normal;
	}
}
